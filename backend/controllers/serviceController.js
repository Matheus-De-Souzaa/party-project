const { Service: ServiceModel } = require("../models/Service");

const serviceController = {

    // Função para criar o serviço
    create: async (req, res) => {
        try {
            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image,
            };

            const response = await ServiceModel.create(service);
            res.status(201).json({ response, msg: "Serviço criado com sucesso!" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro ao criar o serviço." });
        }
    },

    // Função para retornar todos os serviços
    getAll: async (req, res) => {
        try {
            const services = await ServiceModel.find();
            res.json(services);
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro ao buscar os serviços." });
        }
    },

    // Função para retornar um serviço específico pelo ID
    get: async (req, res) => {
        try {
            const id = req.params.id;
            const service = await ServiceModel.findById(id);

            if (!service) {
                return res.status(404).json({ msg: "Serviço não encontrado." });
            }

            res.json(service);
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro ao buscar o serviço." });
        }
    },

    // Função para deletar um serviço pelo ID
    delete: async (req, res) => {
        try {
            const id = req.params.id;

            const service = await ServiceModel.findById(id);
            if (!service) {
                return res.status(404).json({ msg: "Serviço não encontrado." });
            }

            await ServiceModel.findByIdAndDelete(id);
            res.status(200).json({ msg: "Serviço excluído com sucesso." });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro ao excluir o serviço." });
        }
    },
    update: async (req, res) => {
       const id = req.params.id;

        const service = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
        };

        const updatedService = await ServiceModel.findByIdAndUpdate(id, service);

        
            if (!updatedService) {
            res.status(404).json({ msg: "Serviço não encontrado." });
            return;
      }
          res.status(200).json({service, msg: "Serviço atualizado com sucesso."});
    },
};

module.exports = serviceController;
