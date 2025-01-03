export const countFormater = (_item:number)=>{
    if(_item === 1){
        return "Banco Pichincha"
    }else if(_item === 2){
        return "JEP"
    }else{
        return "Billetera"
    }
    

}

export const categoryFormater = (_item:number) =>{
    if(_item === 1){
        return "Alimentacion"
    }else if(_item === 2){
        return "Salud"
    }else if(_item === 3){
        return "Belleza"
    }else if(_item === 4){
        return "Deporte"
    }else if(_item === 5){
        return "Compras Online"
    }else if(_item === 7){
        return "Transporte"
    }
    else{
        return "Entretenimiento"
    }
    
}

export const getFormattedDate = () => {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${month}-${day}-${year}`;
  };
export const getFormattedTime = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  };


  interface BankData {
    description: string;
    number: string;
    name: string;
    code: number;
    mount: string;
    id:string;
}


export const getHighestCode = (arr: BankData[]): number | 0 => {
    if (arr.length === 0) {
      return 1;
    }else{
        const target =  arr.reduce((max: BankData, obj: BankData) => (obj.code > max.code ? obj : max), arr[0])
        return target.code + 1
    }
  };