import React, { useContext, useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Playbook } from '../types/api';

const Playbooks = () => {
  const { playbooks, fetchPlaybooks, createPlaybook, updatePlaybook, deletePlaybook } = useData();
  const [isCreating, setIsCreating] = useState(false);
  const [newPlaybook, setNewPlaybook] = useState<Partial<Playbook>>({ name: '', description: '', rules: [] });
  const [editingPlaybook, setEditingPlaybook] = useState<Playbook | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCreate = async () => {
    try {
      await createPlaybook(newPlaybook);
      setNewPlaybook({ name: '', description: '', rules: [] });
      setIsCreating(false);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage('Failed to create playbook. Please try again.');
      console.error('Error creating playbook:', error);
    }
  };

  const handleEdit = (playbook: Playbook) => {
    setEditingPlaybook(playbook);
    // Populate form with existing playbook data
    setNewPlaybook({ name: playbook.name, description: playbook.description, rules: playbook.rules });
    setIsCreating(true);
  };

  const handleUpdate = async () => {
    try {
      if (editingPlaybook) {
        await updatePlaybook(editingPlaybook.id, newPlaybook);
        setNewPlaybook({ name: '', description: '', rules: [] });
        setEditingPlaybook(null);
        setIsCreating(false);
        setErrorMessage(null);
      }
    } catch (error) {
      setErrorMessage('Failed to update playbook. Please try again.');
      console.error('Error updating playbook:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePlaybook(id);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage('Failed to delete playbook. Please try again.');
      console.error('Error deleting playbook:', error);
    }
  };

  return (
    <div className="flex flex-col h-full p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Playbooks</h1>
      {errorMessage && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
          <span className="block sm:inline">{errorMessage}</span>
          <button onClick={() => setErrorMessage(null)} className="ml-2 text-red-700 font-bold">X</button>
        </div>
      )}
      <button onClick={() => setIsCreating(true)} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create New Playbook
      </button>
      {isCreating && (
        <div className="mb-4 p-4 bg-white rounded shadow">
          <input
            type="text"
            value={newPlaybook.name}
            onChange={(e) => setNewPlaybook({ ...newPlaybook, name: e.target.value })}
            placeholder="Name"
            className="mb-2 w-full p-2 border rounded"
          />
          <textarea
            value={newPlaybook.description}
            onChange={(e) => setNewPlaybook({ ...newPlaybook, description: e.target.value })}
            placeholder="Description"
            className="mb-2 w-full p-2 border rounded"
          />
          {/* Add rule creation UI here */}
          <button
            onClick={editingPlaybook ? handleUpdate : handleCreate}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {editingPlaybook ? 'Update' : 'Create'}
          </button>
          <button
            onClick={() => {
              setIsCreating(false);
              setEditingPlaybook(null);
              setNewPlaybook({ name: '', description: '', rules: [] });
            }}
            className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playbooks && playbooks.map((playbook) => (
          <div key={playbook.id} className="p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{playbook.name}</h2>
            <p className="mb-4">{playbook.description}</p>
            <div className="flex justify-between">
              <button onClick={() => handleEdit(playbook)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">
                Edit
              </button>
              <button onClick={() => handleDelete(playbook.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playbooks; 