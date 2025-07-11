import React from 'react';

function BanList({ banList, onRemove }) {
  return (
    <div className="ban-list">
      <h2>Banned Breeds</h2>
      {banList.length === 0 ? <p>None</p> :
        <ul>
          {banList.map((item, idx) => (
            <li key={idx} onClick={() => onRemove(item)}>{item}</li>
          ))}
        </ul>
      }
    </div>
  );
}

export default BanList;
