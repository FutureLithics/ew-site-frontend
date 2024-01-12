/**
 * setKeywords accetps the state object, plus the specific keyword key and it's value. Generate
 * an object containing keywords and their count
 */
const setKeywords = (object, key, value) => {
  if (value != "") {
    if (object[key] && object[key][value]) {
      object[key][value] += 1;
    } else if (object[key]) {
      object[key][value] = 1;
    } else {
      object[key] = {};
      object[key][value] = 1;
    }
  }
};

/**
 *  setValue takes in an object, and the object's property should yield a number.
 *  Keys in this instance are temperatures
 */
const setValue = (object, key, value) => {
  if (object[key] && value != null && value != "") {
    object[key] = averager(object[key], value, object["count"]);
  } else if (value != null && value != "") {
    object[key] = Number(value);
  }
};

const averager = (currentValue, number, count) => {
  if (number) {
    // only do this if count greater than one and value isn't null
    if (count > 1 && currentValue) {
      let value = (Number(currentValue) + Number(number)) / 2;

      return value;
    } else {
      return Number(number);
    }
  }
};

export const dataByState = (data) => {
  const stateData = {};

  data.map((d) => {
    // if this key does not yet exist, no need to run averager
    if (d.state_fips_code) {
      if (!Object.keys(stateData).includes(d.state_fips_code)) {
        stateData[d.state_fips_code] = {};
        stateData[d.state_fips_code]["count"] = 1;
        stateData[d.state_fips_code]["keywords"] = {};
      } else {
        stateData[d.state_fips_code]["count"] += 1;
      }

      setValue(stateData[d.state_fips_code], "hi_temp", d.hi_5_seq_threshold);
      setValue(stateData[d.state_fips_code], "low_temp", d.c_5_seq_threshold);
      setKeywords(
        stateData[d.state_fips_code],
        "keywords",
        d.c_5_seq_threshold_keyword,
      );
      setKeywords(
        stateData[d.state_fips_code],
        "keywords",
        d.hi_5_seq_threshold_keyword,
      );
    }
  });

  return stateData;
};

export const dataByPlace = (data) => {
  const placeData = {};
  const numKeys = ["c_5_seq_threshold", "hi_5_seq_threshold"];
  const coldKeys = ["c_5_seq_threshold", "c_5_seq_threshold_keyword"];
  const hotKeys = ["hi_5_seq_threshold", "hi_5_seq_threshold_keyword"];

  data.map((d) => {
    const object = {};
    object["hi_temp"] = {};
    object["low_temp"] = {};

    var fips;

    Object.keys(d).map((key) => {
      let val;
      fips = String(d.state_fips_code) + String(d.place_fips_code);

      if (numKeys.includes(key)) {
        val = d[key] ? Number(d[key]) : undefined;
      } else {
        val = d[key];
      }

      if (coldKeys.includes(key)) {
        numKeys.includes(key)
          ? (object["low_temp"]["temp"] = val)
          : (object["low_temp"]["keyword"] = val);
      } else if (hotKeys.includes(key)) {
        numKeys.includes(key)
          ? (object["hi_temp"]["temp"] = val)
          : (object["hi_temp"]["keyword"] = val);
      } else {
        object[key] = val;
      }
    });

    placeData[fips] = object;
  });

  return placeData;
};

export const dataByCounty = (data) => {
  const countyData = {};

  data.map((d) => {
    // if this key does not yet exist, no need to run averager
    if (d.state_fips_code && d.county_fips_code) {
      const code = String(d.state_fips_code) + String(d.county_fips_code);
      if (!Object.keys(countyData).includes(code)) {
        countyData[code] = {};
        countyData[code]["hi_temp"] = {};
        countyData[code]["low_temp"] = {};
        countyData[code]["hi_temp"]["count"] = 1;
        countyData[code]["low_temp"]["count"] = 1;
      }

      setValue(countyData[code]["hi_temp"], "temp", d.hi_5_seq_threshold);
      setValue(countyData[code]["low_temp"], "temp", d.c_5_seq_threshold);
      setKeywords(
        countyData[code]["low_temp"],
        "keyword",
        d.c_5_seq_threshold_keyword,
      );
      setKeywords(
        countyData[code]["hi_temp"],
        "keyword",
        d.hi_5_seq_threshold_keyword,
      );
    }
  });

  return countyData;
};

export const processFragilityData = (data, definitions) => {
  // create three arrays:
  // 1. Can just use Object.keys countyData for slider
  // 2. One that contains the monthly data by county
  // 3. Array with year data for national avg by month (Line Chart)
  const slices = processFragilitySliderData(data);

  const countyData = slices.slice(0, slices.length - 1).reduce((obj, item) => {
    if ([item] != undefined) {
      return { ...obj, [item]: {} };
    }
  }, {});

  const natlData = {};

  data.map((d) => {
    processFragilityDataByCounty(d, countyData, definitions);
    processFragilityDataByNatl(d, natlData, definitions);
  });

  return {
    countyData,
    natlData,
  };
};

const processFragilitySliderData = (data) => {
  return [...new Set(data.map((d) => d.period))];
};

const processFragilityDataByCounty = (d, object, definitions) => {
  if (d.state_fips_code && d.county_fips_code && d.period) {
    const code = String(d.state_fips_code) + String(d.county_fips_code);
    const period = object[d.period];

    if (period) {
      object[d.period][code] = {
        [definitions.Variable]: d[definitions.Variable],
        [definitions.Average]: d[definitions.Average],
      };
    }
  }
};

const processFragilityDataByNatl = (d, object, definitions) => {
  if (d.period) {
    // the national averages will be the same for a period across counties
    // we don't need to perform more operations than necessary.
    if (object[d.period] == null) {
      object[d.period] = {
        [definitions.Average]: d[definitions.Average],
      };
    }
  }
};
