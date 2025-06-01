import { CheckboxInterface } from "../../interfaces/interface"
import { useFilterStore } from "@/app/state/useFilterStore"

const CheckboxComponent = ({ componentName, componentId, componentLabel }: CheckboxInterface) => {
    const {selectedFilters, toggleFilter} = useFilterStore();
    const isChecked = selectedFilters[componentName]?.includes(componentId) || false;

    const handleChange = () => {
        toggleFilter(componentName,componentId);
    }
console.log(selectedFilters)
    return (
        <div key={componentName} className="flex ml-[10px] mb-[5px] gap-[10px] items-center">
            <label htmlFor={`processor_${componentId}`} className="relative cursor-pointer">
                <input
                    id={`processor_${componentId}`}
                    type="checkbox"
                    value={componentId}
                    checked={isChecked}
                    onChange={handleChange}
                    name={componentName}
                    className="peer appearance-none w-[25px] h-[25px] bg-[#2D2D2D] rounded-[8px] border border-[#2D2D2D] cursor-pointer"
                />
                <img
                    src="img/check.svg" 
                    alt="checked"
                    className="w-4 h-4 absolute top-1 left-1 hidden peer-checked:block pointer-events-none"
                />
            </label>
            <label htmlFor={`processor_${componentId}`} className="text-white cursor-pointer text-[17px]">
                {componentLabel}
            </label>
        </div>
    )
}

export default CheckboxComponent
