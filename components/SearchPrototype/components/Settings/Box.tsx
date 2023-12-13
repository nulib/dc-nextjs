import { useEffect, useState, ChangeEvent } from "react";
import SimpleSelect from "@/components/Shared/SimpleSelect.styled";
import { styled } from "@stitches/react";

export type ChatUserConfig = {
  maxDocs: number,
  model: {name: string, label: string},
  temperature: number,
}

const modelOptions = [{name: "GPT-35-Turbo-16k", label: "GPT-3.5"}, {name: "GPT4-Deployment", label: "GPT-4"}]

const SettingsBox = () => {
  const [userConfig, setUserConfig] = useState<ChatUserConfig>({
    temperature: 0.2,
    model: {name: 'GPT4-Deployment', label: 'GPT-4'},
    maxDocs: 10,
  });

  const [model, setModel] = useState<string>('GPT4-Deployment');
  const [temperature, setTemperature] = useState<number>(0.2);

  const handleMaxDocsChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newMaxDocs = event.target.value;
    console.log("doc count changed: ", newMaxDocs);
    setUserConfig(prev => ({ ...prev, maxDocs: newMaxDocs }));
  }

  const handleModelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedModel = event.target.value;
    const selectedLabel = event.target.options[event.target.selectedIndex].text;
    console.log("model selected: ", selectedModel);
    setUserConfig(prev => ({ ...prev, model: { name: selectedModel, label: selectedLabel } }));
  }

  const handleTemperatureChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTemperature = parseFloat(event.target.value);
    console.log("temperature change: ", newTemperature);
    setUserConfig(prev => ({ ...prev, temperature: newTemperature }));
  }

  return (
    <StyledSettingsBox>
      <label>
        Model:
        <SimpleSelect defaultValue={userConfig.model.name} onChange={handleModelChange}>
          {modelOptions.map((option) => (
            <option key={option.label} value={option.name}>
              {option.label}
            </option>
          ))}
        </SimpleSelect>
      </label>
      <label>
        Temperature: 
        <input type="number" step="0.1" min="0" max="1" value={userConfig.temperature} onChange={handleTemperatureChange} />
      </label>
      <label>
        Retrieved Documents (maximum): 
        <input type="number" min="1" max="1000" value={userConfig.maxDocs} onChange={handleMaxDocsChange} />
      </label>
    </StyledSettingsBox>
  );
};

/* eslint sort-keys: 0 */

const StyledSettingsBox = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: '10px',
  alignItems: "stretch",
  backgroundColor: '$black10',
  padding: '20px',
  boxSizing: 'border-box',
  width: '100%',
  borderRadius: '8px',
});

export default SettingsBox;
