// config/filterConfig.ts


export const filterConfig = {
  processors: [
    {
      name: "brand_id",
      label: "Brand",
      type: "select",
      options: [ // Можно получать из API при монтировании
        { label: "Intel", value: 2 },
        { label: "AMD", value: 1 }
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
        { label: "Asrock", value: 3 },
        { label: "MSI", value: 4 }
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
]


};
