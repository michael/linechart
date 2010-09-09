var countries_fixture = {
  "items": {
    "/en/austria": {
      "name": "Austria",
      "official_language": [
        "Croatian language",
        "Slovenian language",
        "Austrian German",
        "German Language",
        "Hungarian"
      ],
      "form_of_government": [
        "Federal republic",
        "Parliamentary republic"
      ],
      "currency_used": "Euro",
      "date_founded": "1955-07-27",
      "birth_rate": [
        11.5,
        11.0,
        11.0,
        10.1,
        10.0,
        9.655,
        9.6,
        9.3,
        8.9,
        9.5,
        9.7,
        9.493,
        9.407,
        9.186
      ],
      "electric_power_consumption": [
        6234.024901,
        6386.341269,
        6556.587938,
        6801.682475,
        6923.178203,
        6963.347265,
        7109.101896,
        7323.994215,
        7416.585252,
        7689.275419,
        7802.855151,
        7886.266746,
        8094.248737,
        8033.333703
      ],
      "unemployment": [
        3.5999999,
        4.3000002,
        5.3000002,
        5.0999999,
        5.5,
        4.6999998,
        4.6999998,
        4.0,
        4.8000002,
        4.8000002,
        5.3000002,
        5.1999998,
        4.6999998,
        4.4000001
      ],
      "gdp_per_capita": [
        25375.0728,
        29965.0492,
        29396.60616,
        25953.48349,
        26577.1087,
        26358.9944,
        23865.45762,
        23642.28367,
        25477.99504,
        31047.10619,
        35356.19929,
        36924.23843,
        38972.67664,
        44656.52316
      ]
    },
    "/en/germany": {
      "name": "Germany",
      "official_language": [
        "German Language"
      ],
      "form_of_government": [
        "Federal republic",
        "Democracy",
        "Parliamentary republic"
      ],
      "currency_used": "Euro",
      "date_founded": "1949-05-23",
      "birth_rate": [
        9.5,
        9.3,
        9.9,
        9.6,
        9.7,
        9.4,
        9.3,
        9.0,
        8.7,
        8.6,
        8.6,
        8.316,
        8.166,
        8.325
      ],
      "electric_power_consumption": [
        6239.008293,
        6330.503907,
        6410.977635,
        6428.653239,
        6507.331164,
        6506.182465,
        6635.543121,
        6764.043579,
        6899.149173,
        6982.760083,
        7082.532229,
        7113.414188,
        7174.137667,
        7184.308553
      ],
      "unemployment": [
        8.6999998,
        8.1999998,
        8.8000002,
        9.8999996,
        9.8000002,
        8.8999996,
        7.9000001,
        7.8000002,
        8.5,
        9.8000002,
        10.6999998,
        11.1000004,
        10.1999998,
        8.6000004
      ],
      "gdp_per_capita": [
        26329.72473,
        30900.66892,
        29769.72276,
        26325.87664,
        26624.78478,
        26113.97852,
        23114.23326,
        22967.35109,
        24445.15393,
        29587.86772,
        33267.33346,
        33827.12586,
        35355.15955,
        40309.71246
      ]
    },
    "/en/switzerland": {
      "name": "Switzerland",
      "official_language": [
        "Romansh language",
        "Schwyzerd\u00fctsch Language",
        "German Language",
        "Italian Language",
        "French Language"
      ],
      "form_of_government": [
        "Federal republic",
        "Direct democracy",
        "Parliamentary republic",
        "Parliamentary system",
        "Federation"
      ],
      "currency_used": "Swiss franc",
      "date_founded": "1291",
      "birth_rate": [
        11.9,
        11.7,
        11.4,
        11.4,
        11.0,
        10.3,
        10.9,
        10.1,
        9.7,
        9.7,
        9.9,
        9.803,
        9.804,
        9.865
      ],
      "electric_power_consumption": [
        7281.670003,
        7398.664962,
        7075.487701,
        7773.702032,
        7218.846695,
        7770.868347,
        7846.500071,
        8034.653237,
        8001.158728,
        8195.8508,
        8205.877888,
        8305.253392,
        8360.442516,
        8163.560437
      ],
      "unemployment": [
        3.8,
        3.3,
        3.7,
        4.0999999,
        3.5999999,
        3.0999999,
        2.7,
        2.5,
        2.9000001,
        4.0999999,
        4.3000002,
        4.4000001,
        4.0,
        3.5999999
      ],
      "gdp_per_capita": [
        38636.13113,
        44871.44911,
        43080.51134,
        37328.4464,
        38344.92715,
        37564.64375,
        34787.10405,
        35269.22843,
        38247.42398,
        44289.6426,
        49121.94441,
        50011.35489,
        51904.7851,
        56500.64121
      ]
    }
  },
  "properties": {
    "name": {
      "name": "Country Name",
      "type": "string",
      "property_key": "name",
      "value_key": "name",
      "unique": true
    },
    "official_language": {
      "name": "Official language",
      "type": "string",
      "property_key": "official_language",
      "value_key": "name",
      "unique": false
    },
    "form_of_government": {
      "name": "Form of governmennt",
      "type": "string",
      "property_key": "form_of_government",
      "value_key": "name",
      "unique": false
    },
    "currency_used": {
      "name": "Currency used",
      "type": "string",
      "property_key": "currency_used",
      "value_key": "name",
      "unique": true
    },
    "date_founded": {
      "name": "Date founded",
      "property_key": "/location/dated_location/date_founded",
      "type": "date",
      "unqiue": true
    },
    "birth_rate": {
      "name": "Birth rate, crude (per 1,000 people)",
      "type": "number",
      "categories": [
        "1994",
        "1995",
        "1996",
        "1997",
        "1998",
        "1999",
        "2000",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007"
      ],
      "unique": false
    },
    "electric_power_consumption": {
      "name": "Electric power consumption (kWh per capita)",
      "type": "number",
      "categories": [
        "1994",
        "1995",
        "1996",
        "1997",
        "1998",
        "1999",
        "2000",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007"
      ],
      "unique": false
    },
    "unemployment": {
      "name": "Unemployment, total (% of total labor force)",
      "type": "number",
      "categories": [
        "1994",
        "1995",
        "1996",
        "1997",
        "1998",
        "1999",
        "2000",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007"
      ],
      "unique": false
    },
    "gdp_per_capita": {
      "name": "GDP per capita (current US$)",
      "type": "number",
      "categories": [
        "1994",
        "1995",
        "1996",
        "1997",
        "1998",
        "1999",
        "2000",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007"
      ],
      "unique": false
    }
  }
};