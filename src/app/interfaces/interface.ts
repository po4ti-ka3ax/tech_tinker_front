export interface FiltersProps {
    componentName: string,
    NameVendor:NameVendor[],
    NameModel:NameModel[],
    ProcessorSocket?:ProcessorSocket[],
    VideoMemoryType?:VideoMemoryType[],
    VideoMemoryVolume?:VideoMemoryVolume[],
}

export interface StatePowerInterface {
    power:Record<string, number>; 
    totalPower: number;
    setPowerStore: (component: string, price: number) => void;
    unsetPowerCurrentComponent: (componentName: string) => void;
    unsetPowerStore: () => void;
    recalculateTotalPower: () => void;
}

export interface StatePriceInterface {
    price: Record<string, number>; 
    totalPrice: number;
    setPriceStore: (component: string, price: number) => void;
    unsetCurrentComponent: (componentName: string) => void;
    unsetPriceStore: () => void;
    recalculateTotal: () => void;
}


export interface ConfigureInterface {
    nameComponent: string,
    linkName: string,
}
export interface CommentInterface {
    userData: object,
    image: string,
    commentText: string,
    
}

export interface SetColorInterface {
    setterColor: (string) => void,
    param: number
}

export interface LongCharacteristicInterface {
    brandComponent:string, 
    nameComponent:string, 
    modelComponent:string,
    price:number
    
}
export interface ShortCharacteristicInterface {
    brandComponent:string, 
    nameComponent:string, 
    modelComponent:string
}

export interface LinkComponentInterface {
    path: string,
    namePath: string
}

export interface ComponentInnerInterface {
    componentKeys:[], 
    componentValues:[], 
    name:string, 
    editOpen:boolean, 
    setEditOpen:() => void, 
    deleteOpen:boolean, 
    setDeleteOpen:() => void, 
    addOpen:boolean, 
    setAddOpen:() => void
}

export interface ProfilePageProps {
  params: { id: number };
}

export interface ComputerCardInterface {
    computerId:number
}

export interface CheckboxInterface {
    componentName: string,
    componentId:number,
    componentLabel:string
    
}

export interface PartInterface {
  title: string;
  componentArray: { id: number; name: string }[];
  showBtn: boolean;
  setShowBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface LinkInterface {
    textLink: string,
    path: string
}

export interface StateConfigureInterface {
    configureStore: {
        [key: string]: any;
    };
    setConfigureStore: (component: string, data: object) => void;
    deleteConfigureObject: (key: string) => void;
    unsetConfigureStore: () => void;
}
export interface FilterState {
    selectedFilters: {
        [key: string]: any;
    };
    toggleFilter: (category: string, id: string) => void;
    setFilterValue: (category: string, value: any) => void;
    clearAllFilters: () => void;
}


interface NameVendor {
    id: number,
    name: string
}
interface NameModel {
    id: number,
    name: string
}
interface ProcessorSocket {
    id: number,
    name: string
}
interface VideoMemoryType {
    id: number,
    name: string
}
interface VideoMemoryVolume {
    id: number,
    name: string
}