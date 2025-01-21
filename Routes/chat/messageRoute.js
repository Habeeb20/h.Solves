import express from "express";
import { isAuthenticate } from "../../middleware/authMiddleware.js";
import Message from "../../models/chat/message.js";
import { getReceiverSocketId } from "../../socket.js";
import Conversation from "../../models/chat/conversation.js";

const messagechatrouter = express.Router()

messagechatrouter.get("/:id", isAuthenticate, async(req, res) => {
    try {
        const { id: userToMessage } = req.params
        const senderId = req.user.id
    
        const conversation = await Conversation.findOne({
          participants: { $all: [senderId, userToMessage] },
        }).populate("messages")
    
        if (!conversation) {
          return res.status(200).json([])
        }
    
        const messages = conversation.messages
    
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({message: "an error occurred"})
    }
})
messagechatrouter.post("/send/:id", isAuthenticate, async( req, res) => {
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user.id
    
        let conversation = await Conversation.findOne({
          participants: { $all: [senderId, receiverId] },
        })
    
        if (!conversation) {
          conversation = await Conversation.create({
            participants: [senderId, receiverId],
          })
        }
    
        const newMessage = new Message({
          senderId,
          receiverId,
          message,
        })
    
        if (newMessage) {
          conversation.messages.push(newMessage._id)
        }
    
        await Promise.all([conversation.save(), newMessage.save()])
    
        // socket io functionality
        const receiverSocketId = getReceiverSocketId(receiverId)
    
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", newMessage)
        }
    
        res.status(201).json(newMessage)
    } catch (error) {
        res.status(500).json({message: "an error occured"})
    }
})

messagechatrouter.get('/users/:id/unread-messages', async(req, res) => {
    try {
        const count = await Message.countDocuments({ receiver: req.params.id, read: false });
        res.json({ count });
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch unread message count' });
      }
})


messagechatrouter.patch('/messages/:id/read', async(req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(
          req.params.id,
          { read: true },
          { new: true }
        );
        res.json(message);
      } catch (err) {
        res.status(500).json({ error: 'Failed to update message status' });
      }
})

export default messagechatrouter