// used in login

interface triggerTextBoxItems {
  value: string;
  label: string;
  onChange: (value: string) => void;
  isPassword?: boolean;
}

const TriggerTextBox: React.FC<triggerTextBoxItems> = ({
  label,
  value,
  onChange,
  isPassword,
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={isPassword ? "password" : "text"}
        className="form-control form-control-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "200px" }}
      />
    </div>
  );
};

export default TriggerTextBox;
