import { CheckboxInterface } from "../../interfaces/interface"

const CheckboxComponent = ({ componentName, componentId }: CheckboxInterface) => {
    return (
        <div key={componentName} className="flex ml-[10px] mb-[5px] gap-[10px] items-center">
            <label htmlFor={`processor_${componentId}`} className="relative cursor-pointer">
                <input
                    id={`processor_${componentName}`}
                    type="checkbox"
                    value={componentId}
                    name={componentName}
                    className="peer appearance-none w-[25px] h-[25px] bg-[#2D2D2D] rounded-[8px] border border-[#2D2D2D] cursor-pointer"
                />
                <img
                    src="img/check.svg" 
                    alt="checked"
                    className="w-4 h-4 absolute top-1 left-1 hidden peer-checked:block pointer-events-none"
                />
            </label>
            <label htmlFor={`processor_${componentName}`} className="text-white cursor-pointer text-[17px]">
                {componentName}
            </label>
        </div>
    )
}

export default CheckboxComponent
