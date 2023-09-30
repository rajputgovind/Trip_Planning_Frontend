export default function DateFormat(data) {
    if (data) {
      const data1 = data.toString();
      const data2 = new Date(data);
  
      let formatDate = `${data2.getDate()}/${
        data2.getMonth() + 1
      }/${data2.getFullYear()}`;
  
      return formatDate;
    }
  }
  