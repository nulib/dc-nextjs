interface LayoutHelperProps {
  title: string;
}

const LayoutHelper: React.FC<LayoutHelperProps> = ({ title }) => {
  return (
    <div>
      <div>{title}</div>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LayoutHelper;
