function CatCard({ image, breed, origin, temperament, onBan }) {
    console.log("Rendering CatCard with:", { image, breed, origin, temperament });

    return (
        <div className="cat-card">
            <img src={image} alt="A cat" />
            <p><strong>Breed:</strong> <span onClick={() => onBan(breed)} style={{ cursor: 'pointer', color: 'blue' }}>{breed}</span></p>
            <p><strong>Origin:</strong> {origin}</p>
            <p><strong>Temperament:</strong> {temperament}</p>
        </div>
    );
}

export default CatCard;
