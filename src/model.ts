const localStorageKeyName = 'recordList';
const model = {
    fetch(){
        return JSON.parse(localStorage.getItem(localStorageKeyName) || '[]');
    },
    save(data: RecordItem[]){
        localStorage.setItem(localStorageKeyName,JSON.stringify(data));
    }
}
export {model};