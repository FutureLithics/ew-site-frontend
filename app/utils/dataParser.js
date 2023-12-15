/**
 * setKeywords accetps the state object, plus the specific keyword key and it's value. Generate
 * an object containing keywords and their count
 */
const setKeywords = (object, key, value) => {
    if(value != '') {
        if ( object[key] && object[key][value] ) {
            object[key][value] += 1;
        } else if (object[key]) {
            object[key][value] = 1;
        } else {
            object[key] = {};
            object[key][value] = 1;
        }        
    }

}

/**
 *  setValue takes in an object, and the object's property should yield a number.
 *  Keys in this instance are temperatures
 */
const setValue = (object, key, value) => {
    if(object[key] && value != null && value != ''){
        object[key] = averager(object[key], value, object["count"]);
    } else if(value != null && value != '') {
        object[key] = Number(value);
    } 
}

const averager = (currentValue, number, count) => {
    if(number) {
        // only do this if count greater than one and value isn't null
        if(count > 1 && currentValue) {
            let value = (Number(currentValue) + Number(number)) / 2;

            return value;
        } else {
            return number;
        }        
    }
}

export const dataByState = (data) => {
    const stateData = {};
        
    data.map((d) => {
        // if this key does not yet exist, no need to run averager
        if (d.state_fips_code){
            if(!Object.keys(stateData).includes(d.state_fips_code)){
                stateData[d.state_fips_code] = {};
                stateData[d.state_fips_code]['count'] = 1;
                stateData[d.state_fips_code]['keywords'] = {};
            } else {
                stateData[d.state_fips_code]['count'] += 1;
            }

            setValue(stateData[d.state_fips_code], 'avg_hi_temp', d.hi_5_seq_threshold);
            setValue(stateData[d.state_fips_code], 'avg_low_temp', d.c_5_seq_threshold);
            setKeywords(stateData[d.state_fips_code]['keywords'], 'cold_keywords', d.c_5_seq_threshold_keyword);
            setKeywords(stateData[d.state_fips_code]['keywords'], 'hot_keywords', d.hi_5_seq_threshold_keyword);
 
        }
    })  
    
    return stateData;
}
