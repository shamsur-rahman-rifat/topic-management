import topicModel from '../models/topicModel.js';

export async function createTopic(req, res) {
    try {
        let reqBody=req.body 
        await topicModel.create(reqBody)
        return res.status(200).json({status:"Success",message:"Topic Added"})
    } catch (error) {
        res.json({status:"Failed",message:error})
    }
}

export async function readTopic(req, res) {
    try {
        let rows= await topicModel.find()
        return res.status(200).json({status:"Success",message:"Topic List", row:rows})
    } catch (error) {
        res.json({status:"Failed",message:error})
    }
}

export async function readTopicById(req, res) {
    try {
        let {id}=req.params
        let rows= await topicModel.find({_id:id})
        return res.status(200).json({status:"Success",message:"Topic By ID", row:rows})
    } catch (error) {
        res.json({status:"Failed",message:error})
    }
}

export async function updateTopic(req, res) {
    try {
        let {id}=req.params
        let reqBody=req.body 
        await topicModel.updateOne({_id:id},reqBody)
        return res.status(200).json({status:"Success",message:"Topic Updated"})
    } catch (error) {
        res.json({status:"Failed",message:error})
    }
}  
export async function deleteTopic(req, res) {
    try {
        let {id}=req.params
        await topicModel.deleteOne({_id:id})
        return res.status(200).json({status:"Success",message:"Topic Deleted"})
    } catch (error) {
        res.json({status:"Failed",message:error})
    }
}

export default {
  createTopic,
  readTopic,
  readTopicById,
  updateTopic,
  deleteTopic
};