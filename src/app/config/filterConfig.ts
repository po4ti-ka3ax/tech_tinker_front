// config/filterConfig.ts


export const filterConfig = {
  processors: [
    {
      name: "brand_id",
      label: "Brand",
      type: "select",
      options: [ // Можно получать из API при монтировании
        
      ]
    },
    {
      name: "socket_id",
      label: "Socket",
      type: "select",
      options: [/* подгружается с API */]
    },
    {
      name: "memory_generation_id",
      label: "Memory generation",
      type: "select",
      options: [/* подгружается с API */]
    },
    {
      name: "price",
      label: "Price",
      type: "range"
    },
    {
      name: "power",
      label: "Power (Wt)",
      type: "range"
    },
    {
      name: "frequency",
      label: "Frequency (Ghz)",
      type: "number"
    },
    {
      name: "price_sort",
      label: "Sort by price",
      type: "sort",
      options: ["asc", "desc"]
    },
    {
      name: "power_sort",
      label: "Sort by power",
      type: "sort",
      options: ["asc", "desc"]
    },
    {
      name: "per_page",
      label: "Number per page",
      type: "number"
    }
  ],
   motherboards: [
    {
      name: "brand_id",
      label: "Brand",
      type: "select",
      options: [
        
      ]
    },
    {
      name: "form_factor_id",
      label: "Form Factor",
      type: "select",
      options: [/* подгружается с API */]
    },
    // {
    //   name: "connect_interfaces_id",
    //   label: "Connect Interfaces",
    //   type: "multiselect", // т.к. массив
    //   options: [/* подгружается с API */]
    // },
    {
      name: "socket_id",
      label: "Socket",
      type: "select",
      options: [/* подгружается с API */]
    },
    {
      name: "memory_generation_id",
      label: "Memory Generation",
      type: "select",
      options: [/* подгружается с API */]
    },
    {
      name: "chipset_id",
      label: "Chipset",
      type: "select",
      options: [/* подгружается с API */]
    },
    // {
    //   name: "chipset",
    //   label: "Chipset",
    //   type: "select",
    //   options: [/* подгружается с API */]
    // },
    {
      name: "price",
      label: "Price",
      type: "range"
    },
    {
      name: "power",
      label: "Power (Wt)",
      type: "range"
    },
    {
      name: "price_sort",
      label: "Sort by Price",
      type: "sort",
      options: ["asc", "desc"]
    },
    {
      name: "power_sort",
      label: "Sort by Power",
      type: "sort",
      options: ["asc", "desc"]
    },
    {
      name: "per_page",
      label: "Number per Page",
      type: "number"
    }
  ],
  videocards: [
  {
    name: "brand_id",
    label: "Brand",
    type: "select",
    options: [
    
    ]
  },
  {
    name: "memory_generation_id",
    label: "Memory Generation",
    type: "select",
    options: [/* подгружается с API */]
  },
  {
    name: "price",
    label: "Price",
    type: "range"
  },
  {
    name: "power",
    label: "Power (Wt)",
    type: "range"
  },
  // {
  //   name: "frequency",
  //   label: "Frequency (GHz)",
  //   type: "number"
  // },
  {
    name: "memory_volume",
    label: "Memory Volume (GB)",
    type: "number"
  },
  {
    name: "height",
    label: "Height (mm)",
    type: "range"
  },
  {
    name: "width",
    label: "Width (mm)",
    type: "range"
  },
  {
    name: "price_sort",
    label: "Sort by Price",
    type: "sort",
    options: ["asc", "desc"]
  },
  {
    name: "power_sort",
    label: "Sort by Power",
    type: "sort",
    options: ["asc", "desc"]
  },
  {
    name: "per_page",
    label: "Number per Page",
    type: "number"
  }
  ],
  ram: [
  {
    name: "brand_id",
    label: "Brand",
    type: "select",
    options: [/* подгружается с API */]
  },
  {
    name: "memory_generation_id",
    label: "Memory Generation",
    type: "select",
    options: [/* подгружается с API */]
  },
  {
    name: "memory_volume",
    label: "Memory Volume (GB)",
    type: "number"
  },
  {
    name: "frequency",
    label: "Frequency (MHz)",
    type: "number"
  },
  {
    name: "price",
    label: "Price",
    type: "range"
  },
  {
    name: "price_sort",
    label: "Sort by Price",
    type: "sort",
    options: ["asc", "desc"]
  },
  {
    name: "frequency_sort",
    label: "Sort by Frequency",
    type: "sort",
    options: ["asc", "desc"]
  },
  {
    name: "per_page",
    label: "Number per Page",
    type: "number"
  }
],
cooling: [
  {
    name: "brand_id",
    label: "Brand",
    type: "select",
    options: [/* подгружается с API */]
  },
  {
    name: "cooling_type",
    label: "Cooling Type",
    type: "select",
    options: [/* подгружается с API */]
  },
  {
    name: "socket_id",
    label: "Socket Compatibility",
    type: "select",
    options: [/* подгружается с API */]
  },
  {
    name: "height",
    label: "Height (mm)",
    type: "range"
  },
  {
    name: "width",
    label: "Width (mm)",
    type: "range"
  },
  {
    name: "price",
    label: "Price",
    type: "range"
  },
  {
    name: "price_sort",
    label: "Sort by Price",
    type: "sort",
    options: ["asc", "desc"]
  },
  {
    name: "per_page",
    label: "Number per Page",
    type: "number"
  }
],
storages: [
  {
    name: "brand_id",
    label: "Brand",
    type: "select",
    options: [/* подгружается с API */]
  },
  {
    name: "connect_interfaces_id",
    label: "Connect Interface",
    type: "select", // потому что может быть массив интерфейсов
    options: [
      { label: "M2", value: 6 },
      { label: "SATA", value: 5 },
    ]
  },
  {
    name: "storage_type_id",
    label: "Storage Type",
    type: "select",
    options: [/* подгружается с API */]
  },
  {
    name: "volume",
    label: "Volume (GB)",
    type: "select",
    options: [
      { label: "128GB", value: 128 },
      { label: "512GB", value: 512 },
      { label: "1TB", value: 1000 },
      { label: "2TB", value: 2000 },
    ]
  },
  {
    name: "price",
    label: "Price",
    type: "range"
  },
  {
    name: "price_sort",
    label: "Sort by Price",
    type: "sort",
    options: ["asc", "desc"]
  },
  {
    name: "per_page",
    label: "Number per Page",
    type: "number"
  }
],
cases: [
  {
    name: "brand_id",
    label: "Brand",
    type: "select",
    options: [/* подгружается с API */]
  },
  {
    name: "form_factors_id",
    label: "Form Factors",
    type: "select", 
    options: [/* подгружается с API */]
  },
  {
    name: "price",
    label: "Price",
    type: "range"
  },
  {
    name: "height",
    label: "Case Height (mm)",
    type: "range"
  },
  {
    name: "width",
    label: "Case Width (mm)",
    type: "range"
  },
  {
    name: "gpu_height",
    label: "GPU Height (mm)",
    type: "range"
  },
  {
    name: "gpu_width",
    label: "GPU Width (mm)",
    type: "range"
  },
  {
    name: "cooling_height",
    label: "Cooling Height (mm)",
    type: "range"
  },
  {
    name: "cooling_width",
    label: "Cooling Width (mm)",
    type: "range"
  },
  {
    name: "price_sort",
    label: "Sort by Price",
    type: "sort",
    options: ["asc", "desc"]
  },
  {
    name: "per_page",
    label: "Number per Page",
    type: "number"
  }
],
power_supplies: [
  {
    name: "brand_id",
    label: "Brand",
    type: "select",
    options: [/* подгружается с API */]
  },
  {
    name: "connect_interfaces_id",
    label: "Connect Interface",
    type: "select", // предполагается множественный выбор
    options: [/* подгружается с API */]
  },
  // {
  //   name: "power_protect_type_id",
  //   label: "Power Protection Types",
  //   type: "select", // предполагается множественный выбор
  //   options: [/* подгружается с API */]
  // },
  {
    name: "power",
    label: "Power (W)",
    type: "range"
  },
  {
    name: "price",
    label: "Price",
    type: "range"
  },
  {
    name: "power_sort",
    label: "Sort by Power",
    type: "sort",
    options: ["asc", "desc"]
  },
  {
    name: "price_sort",
    label: "Sort by Price",
    type: "sort",
    options: ["asc", "desc"]
  },
  {
    name: "per_page",
    label: "Number per Page",
    type: "number"
  }
],
builds: [
  {
    name: "search",
    label: "Search",
    type: "text"
  },
  {
    name: "processor_id",
    label: "Processor",
    type: "select",
    options: []
  },
  {
    name: "motherboard_id",
    label: "Motherboard",
    type: "select",
    options: []
  },
  {
    name: "graphic_card_id",
    label: "Graphic Card",
    type: "select",
    options: []
  },
  {
    name: "system_memory_id",
    label: "System Memory",
    type: "select",
    options: []
  },
  {
    name: "cooling_spec_id",
    label: "Cooling",
    type: "select",
    options: []
  },
  {
    name: "storage_id",
    label: "Storage",
    type: "select",
    options: []
  },
  {
    name: "computer_case_id",
    label: "Case",
    type: "select",
    options: []
  },
  {
    name: "power_id",
    label: "Power",
    type: "select",
    options: []
  },
  {
    name: "user_id",
    label: "User",
    type: "select",
    options: []
  },
  {
    name: "price",
    label: "Price",
    type: "range"
  },
  {
    name: "price_sort",
    label: "Sort by Price",
    type: "sort",
    options: ["asc", "desc"]
  },
  {
    name: "average_rating_sort",
    label: "Sort by Rating",
    type: "sort",
    options: ["asc", "desc"]
  },
  {
    name: "per_page",
    label: "Number per Page",
    type: "number"
  }
]




};
