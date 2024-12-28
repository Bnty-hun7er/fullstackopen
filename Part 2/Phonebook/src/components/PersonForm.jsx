const PersonForm = ({
    addPerson,
    newName,
    newPhone,
    handlePersonChange,
    handlePhoneChange,
  }) => {
    return (
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} /> <br />
          phone: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
  };
  
  export default PersonForm;
  