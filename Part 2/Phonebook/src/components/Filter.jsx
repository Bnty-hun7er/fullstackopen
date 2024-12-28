const Filter = ({ search, handleSearchChange }) => {
    return (
      <div>
        FILTER shown with <input value={search} onChange={handleSearchChange} />
      </div>
    );
  };
  
  export default Filter;
  