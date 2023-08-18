import BaseApi from "../../../services/Api";
import {toast} from "react-toastify";
import Swal from "sweetalert2";
import React, {useEffect, useState} from "react";
import Tooltip from "../../Popups/Tooltip";
import {Modal, Spinner} from "react-bootstrap";
import Button from "../../Layout/Button";




const INITIAL_DATA = {
    total: 0,
    current_page: 1,
    last_page: 1,
    first_page_url: "",
    last_page_url: "",
    next_page_url: "",
    prev_page_url: null,
    path: "",
    from: 1,
    to: 1,
    data: [],
  };


const ModalPlayer = ({
  idPlayer, onUpdate, onCreate, children
}) => {
  const [isLoading, setLoading] = React.useState(true);
  const [isSaving, setSaving] = React.useState(true);
  const [isShow, setShowModal] = React.useState(false);

  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [age, setAge] = useState('');
  const [nationality, setNationality] = useState('');
  const [image, setImage] = useState(null);
  const [natAPI, setNatAPI] = React.useState({ ...INITIAL_DATA });
  
    const getNationality = () =>{
        BaseApi
        .get("/nacionalidade")
        .then((response) =>{
            setNatAPI(response.data)
        }
        )
    }

   


  const submitData = () => {
    setSaving(true);
    if (idPlayer) {
      BaseApi.put(`/jogador/${idPlayer}`, {
        nome: name,
        time: team,
        idade: age,
        nacionalidade_id: nationality,
        imagem: image,
      }).then(res => {
      

        setSaving(false);
        setShowModal(false);
        toast.success('Player updated successfully!');
        onUpdate && onUpdate(res.data);
      }).catch(err => {
        console.log(err);
        Swal.fire('Oops!', err?.data?.errors?.[0] || err?.data?.message || 'Ocorreu um erro ao atualizar este usuário.', 'error');
        setSaving(false);
      })
    }
    else {
      BaseApi.post('/jogador', {
        nome: name,
        time: team,
        idade: age,
        nacionalidade_id: nationality,
        imagem: image,

      }).then(res => {
        
        setSaving(false);
        setShowModal(false);
        toast.success('Player created successfully!');
        onCreate && onCreate(res.data);
      }).catch(err => {
        console.log(err);
        Swal.fire('Oops!', err?.data?.errors?.[0] || err?.data?.message || 'Ocorreu um erro ao criar este usuário.', 'error');
        setSaving(false);
      })
    }
  }

  const handleClose = () => {
    setShowModal(false);
  }

  const handleChangeImage = (event) => {
 
    setImage(event.target.files[0])
    console.log(image)

  
    
    
    

  }

  const requestData = () => {
    setLoading(true);
    BaseApi.get(`/jogador${idPlayer ? `/${idPlayer}` : ''}`).then(res => {
      let data = res.data;
      setName(data.nome);
      setTeam(data.time);
      setAge(data.idade);
      setNationality(data.nacionalidade_id)
      setImage(data.imagem)
      setLoading(false);
      setSaving(false);
    }).catch(err => {
      console.log(err);
      Swal.fire('Oops!', err?.data?.errors?.[0] || err?.data?.message || 'Ocorreu um erro ao carregar este lead ou não foi encontrado.', 'error');
      setShowModal(false);
    })
  }

  useEffect(() => {
    if(isShow) {
    getNationality();
      requestData();
    } else {
      setName('');
      setTeam('');
      setAge('');
      setNationality('');
      setImage(null);
      setLoading(true);
      setSaving(true);
    }
  }, [isShow])

  return (
    <>
  
      {children &&
        React.cloneElement(children, { onClick: (e) => setShowModal(true) })}
      {!children && (
        <Tooltip text={idPlayer ? "Edit Player" : "Create Player"}>
          <button
            className={`btn btn-${idPlayer ? "warning" : ""} text-white fa-bold`}
            onClick={(e) => setShowModal(true)}
          >
            <i className={`bi bi-${idPlayer ? "person-gear" : "plus"}`}></i>
          </button>
        </Tooltip>
      )}
      <Modal
        centered
        scrollable
        onHide={handleClose}
        show={isShow}
        animation={true}
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>{idPlayer ? "Edit" : "Create"} usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center justify-content-center">
            {isLoading && (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </div>
          {!isLoading && (
            <>
              <div className="row">
                <h3 className="font-weight-bold">Player's Information</h3>
                <div className="form-group mb-3">
                  <label htmlFor="name">Player's name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Player's name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="team">Player's Team</label>
                  <input
                    type="text"
                    className="form-control"
                    id="team"
                    placeholder="Enter player's team"
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="age">Player's age</label>
                  <input
                    type="number"
                    className="form-control"
                    id="age"
                    placeholder="Enter player's Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                

                <div className="form-group mb-3">
                  <label htmlFor="nationality">Player's Nationality</label>
                  <select value={nationality} name="nationality" id="nationality" onChange={(e)=>setNationality(e.target.value)} className="form-select">
                    <option value="" disabled="disabled" selected>Chose the Player's nationality</option>
                        {natAPI.data.map((item)=>(
                        <option value={item.id}>{item.nome}</option>
                        ))}
                    </select>
                  
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="image">Player's Image</label>

                  <input type="file" accept="image/*"
                  className="form-control"
                  
                  onChange={handleChangeImage} />
                  
                  {idPlayer ? (
                    <div className="d-flex justify-content-center align-items-center mt-2">
                      <img
                        src={image instanceof File ? URL.createObjectURL(image) : image}
                        alt="imagem"
                        style={{ minWidth: 250, width: 350, objectFit: 'cover' }}
                      />
                    </div>
                  ) : 
                    null
                  }

                  {image && !idPlayer && (
                    <div className="d-flex justify-content-center align-items-center mt-2">
                      {idPlayer ? <img src={image} alt="imagem" style={{minWidth: 250, width: 350, objectFit: "cover"}}/>
                        : <img src={URL.createObjectURL(image)} alt="imagem" style={{minWidth: 250, width: 350, objectFit: "cover"}}/>
                      }
                      </div>
                    )
                  }
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex align-items-center w-100">
            <div className="d-block me-auto"></div>
            <div className="d-block ms-auto">
              <button
                className="btn btn-danger text-white me-2"
                onClick={handleClose}
              >
                Close
              </button>
              <Button
                loading={isSaving}
                onClick={submitData}
                className="btn btn-success text-white"
              >
                {idPlayer ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalPlayer;