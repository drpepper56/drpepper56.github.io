// the ting in the middle

interface BuilderContainerItems {
  placeholder: string;
}
const BuilderContainer: React.FC<BuilderContainerItems> = ({ placeholder }) => {
  return (
    <div className="builder-container">
      <p>{placeholder.toUpperCase()}</p>
      <div className="recipe-output-container"></div>
    </div>
  );
};

export default BuilderContainer;
