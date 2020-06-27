const TaskModel = require('../model/TaskModel');
const { 
    startOfDay,
    endOfDay,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear
    } = require('date-fns');

const current = new Date();

class TaskController {

    async all(req, res){
        await TaskModel.find({ macaddress: {'$in': req.params.macaddress } })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    async show(req, res){
        await TaskModel.findById(req.params.id)
        .then(response => {

             if(response)
                 return res.status(200).json(response);
             else
                 return res.status(500).json({error: 'Tarefa não encontrada!'})

        }).catch(error => {
            return res.status(500).json(error);
        });
    }

    async create(req, res){
        const task = new TaskModel(req.body);
        await task
            .save()
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    async update(req, res){
        await TaskModel.findOneAndUpdate({'_id': req.params.id }, req.body, { new: true }) //({new = true}) retorna dados 
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        })
    }

    async delete(req, res){
        await TaskModel.deleteOne({'_id': req.params.id})
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        })
    }

    async done(req,res){
        await TaskModel.findByIdAndUpdate(
            {'_id': req.params.id},
            {'done': req.params.done},
            {new: true})
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).josn(error);
            });
    }

    //tarefas atrasadas
    async late(req, res){
        await TaskModel
        .find({
            'when': {'$lt': current},
            'macaddress': {'$in': req.params.macaddress}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        })
    }

    //tarefas hoje
    async today(req, res){
        await TaskModel
        .find({
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte': startOfDay(current), "$lte": endOfDay(current)} //"$gte"(get then equals) operação mongodb >= | "$lt"(last then equals) <=
        })
        .sort('when') 
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        })
    }

    //tarefa semana
    async week(req, res){
        await TaskModel
        .find({
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte': startOfWeek(current), '$lte': endOfWeek(current)}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    async month(req, res){
        await TaskModel
                .find({
                    'macaddress': {'$in': req.params.macaddress},
                    'when': {'$gte': startOfMonth(current), '$lte': endOfMonth(current)}
                })
                .sort('when')
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
    }

    async year(req, res){
        await TaskModel
                .find({
                    'macaddress': {'$in': req.params.macaddress},
                    'when': {'$gte': startOfYear(current), '$lte': endOfYear(current)}
                })
                .sort('when')
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
    }
}

module.exports = new TaskController();