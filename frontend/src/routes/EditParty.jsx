import partyFetch from '../axios/config';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useToast from '../hook/useToast';

import './Form.css';

const EditParty = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [party, setParty] = useState({
        title: "",
        author: "",
        description: "",
        budget: "",
        image: "",
        services: [],
    });
    
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);

    // Carregar serviços e dados da festa
    useEffect(() => {
        const loadServices = async () => {
            try {
                const res = await partyFetch.get("/services");
                setServices(res.data);
            } catch (error) {
                console.error("Erro ao carregar serviços:", error);
                useToast("Erro ao carregar serviços", "error");
            }
        };

        const loadParty = async () => {
            try {
                const res = await partyFetch.get(`/parties/${id}`);
                setParty(res.data);
                setSelectedServices(res.data.services);
            } catch (error) {
                console.error("Erro ao carregar festa:", error);
                useToast("Erro ao carregar festa", "error");
            }
        };

        loadServices();
        loadParty();
    }, [id]);

    const handleServices = (e, serviceId) => {
        const isChecked = e.target.checked;
    
        if (isChecked) {
          const serviceToAdd = services.find((service) => service._id === serviceId);
          if (serviceToAdd) {
            setSelectedServices((prevSelected) => [...prevSelected, serviceToAdd]);
            console.log('Serviço adicionado:', serviceToAdd);
          }
        } else {
          setSelectedServices((prevSelected) =>
            prevSelected.filter((service) => service._id !== serviceId)
          );
          console.log('Serviço removido:', serviceId);
        }
      };
    

    const updateParty = async (e) => {
        e.preventDefault();

        try {
            const updatedParty = {
                ...party,
                services: selectedServices,
            };

            const res = await partyFetch.put(`/parties/${id}`, updatedParty);

            if (res.status === 200) {
                navigate("/");
                useToast("Festa atualizada com sucesso!", "success");
            }
        } catch (error) {
            useToast("O seu orçamento é insuficiente", "error");
        }
    };

    if (!party) return <p>Carregando...</p>;

    return (
        <div className="form-page">
            <h2>Editando: {party.title}</h2>
            <p>Ajuste as informações da sua festa</p>
            <form onSubmit={updateParty}>
                <label>
                    <span>Nome da festa:</span>
                    <input
                        type="text"
                        placeholder="Seja criativo..."
                        required
                        onChange={(e) => setParty({ ...party, title: e.target.value })}
                        value={party.title}
                    />
                </label>
                <label>
                    <span>Anfitrião:</span>
                    <input
                        type="text"
                        placeholder="Quem está dando a festa?"
                        required
                        onChange={(e) => setParty({ ...party, author: e.target.value })}
                        value={party.author}
                    />
                </label>
                <label>
                    <span>Descrição:</span>
                    <textarea
                        placeholder="Conte mais sobre a festa..."
                        required
                        onChange={(e) => setParty({ ...party, description: e.target.value })}
                        value={party.description}
                    ></textarea>
                </label>
                <label>
                    <span>Orçamento:</span>
                    <input
                        type="number"
                        placeholder="Quanto você pretende investir?"
                        required
                        onChange={(e) => setParty({ ...party, budget: e.target.value })}
                        value={party.budget}
                    />
                </label>
                <label>
                    <span>Imagem:</span>
                    <input
                        type="text"
                        placeholder="Insira a URL de uma imagem"
                        onChange={(e) => setParty({ ...party, image: e.target.value })}
                        value={party.image}
                    />
                </label>
                <div>
                    <h2>Escolha os serviços</h2>
                    <div className="services-container">
                        {services.length === 0 && <p>Carregando...</p>}
                        {services.length > 0 &&
                            services.map((service) => (
                                <div className="service" key={service._id}>
                                    <img src={service.image} alt={service.name} />
                                    <p className="service-name">{service.name}</p>
                                    <p className="service-price">R${service.price}</p>
                                    <label className="checkbox-container">
                                        <input
                                            type="checkbox"
                                            value={service._id}
                                            onChange={(e) => handleServices(e, service._id)}
                                            checked={selectedServices.some((selected) => selected._id === service._id)}
                                        />
                                        <span className="checkmark"></span>
                                        Marque para solicitar
                                    </label>
                                </div>
                            ))}
                    </div>
                </div>
                <input type="submit" value="Atualizar Festa" className="btn" />
            </form>
        </div>
    );
};

export default EditParty;
