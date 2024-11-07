const PartyModel = require("../models/Party");
const { Service } = require("../models/Service");

const checkPartyBudget = (budget, services) => {
    const priceSum = services.reduce((sum, service) => sum + service.price, 0);

    // Verificar se a soma é maior que o orçamento e, se for, dar um return false.
    if (priceSum > budget) {
        return false;
    }

    return true;
};

const partyController = {
    create: async (req, res) => {
        try {

            const Party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image || "URL da imagem padrão aqui", // Garantir que a URL da imagem seja enviada corretamente
                services: req.body.services,
            };

            if (Party.services && !checkPartyBudget(Party.budget, Party.services)) {
                res.status(406).json({ msg: "O seu orçamento é insuficiente." });
                return;
            }

            const response = await PartyModel.create(Party);
            res.status(201).json({ response, msg: "Festa criada com sucesso!" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Erro ao criar a festa." }); // Lidar com erros no backend
        }
    },
    getAll: async (req, res) => {
        try {
            const parties = await PartyModel.find();
            res.json(parties);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro ao buscar os dados' });
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id;
            const party = await PartyModel.findById(id);

            if (!party) {
                return res.status(404).json({ msg: "Festa não encontrada." });
            }

            res.json(party);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Erro ao buscar a festa." });
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const party = await PartyModel.findById(id);

            if (!party) {
                return res.status(404).json({ msg: "Festa não encontrada." });
            }

            await PartyModel.findByIdAndDelete(id);
            res.status(200).json({ msg: "Festa excluída com sucesso!" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Erro ao excluir a festa." });
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;

            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image || "URL da imagem padrão aqui", // Verificar e garantir que a URL de imagem seja passada
                services: req.body.services,
            };

            if (party.services && !checkPartyBudget(party.budget, party.services)) {
                return res.status(406).json({ msg: "O seu orçamento é insuficiente." });
            }

            const updatedParty = await PartyModel.findByIdAndUpdate(id, party, { new: true });

            if (!updatedParty) {
                return res.status(404).json({ msg: "Festa não encontrada." });
            }

            res.status(200).json({ party: updatedParty, msg: "Festa atualizada com sucesso." });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Erro ao atualizar a festa." });
        }
    },
};

module.exports = partyController;
