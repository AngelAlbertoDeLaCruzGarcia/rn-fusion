export function sortArrayByDay(array){
    return array.sort(function(a,b) {
        return new Date( b.Date ) - new Date(a.Date);
    });
}