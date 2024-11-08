import axios from "axios";
import { useEffect, useState } from "react";
import '../components/home.css';

export default function Home() {
  const [data, setData] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", first_name: "" });
  const [editUser, setEditUser] = useState(null); 
  const [isEditMode, setIsEditMode] = useState(false);

  // Charger les données depuis l'API
  const loadData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/get');
      setData(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des données", error);
    }
  };

  const addUser = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/add', newUser);
      setData([...data, response.data]);
      setNewUser({ name: "", first_name: "" });
    } catch (error) {
      console.error("Erreur lors de l'ajout", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete/${id}`);
      setData(data.filter(user => user.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };

  const updateUser = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/update/${editUser.id}`, editUser);
      setData(data.map(user => user.id === editUser.id ? response.data : user));
      setIsEditMode(false);
      setEditUser(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <h1>Gestion Dashboard Users App</h1>

      <div className="form-container">
        <h4>{isEditMode ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}</h4>
        <input
          type="text"
          placeholder="Nom"
          value={isEditMode ? editUser.name : newUser.name}
          onChange={(e) => isEditMode ? setEditUser({ ...editUser, name: e.target.value }) : setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Prénom"
          value={isEditMode ? editUser.first_name : newUser.first_name}
          onChange={(e) => isEditMode ? setEditUser({ ...editUser, first_name: e.target.value }) : setNewUser({ ...newUser, first_name: e.target.value })}
        />
        <button className="btn" onClick={isEditMode ? updateUser : addUser}>
          {isEditMode ? "Mettre à jour" : "Ajouter"}
        </button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Date de création</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.first_name}</td>
              <td>{user.created_at ? new Date(user.created_at).toLocaleString() : "N/A"}</td>
              <td>
                <button className="btn edit" onClick={() => {
                  setIsEditMode(true);
                  setEditUser({ id: user.id, name: user.name, first_name: user.first_name });
                }}>
                  Modifier
                </button>
                <button className="btn delete" onClick={() => deleteUser(user.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
