
const timeFormat = (minutes)=>{
    const hour = Math.floor(minutes/60);
    const min = minutes %60;
    return `${hour}h ${min}min`
}

export default timeFormat;