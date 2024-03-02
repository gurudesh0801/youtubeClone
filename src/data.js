export const API_KEY = 'AIzaSyCGzaC7cQ1B70dAhBXVRk1JyYd-w0og6q4'

export const value_converter = (value)=>{
    if(value > 1000000)
    {
        return Math.floor(value/1000000)+"M"
    }
    else if(value >=1000){
        return Math.floor(value/1000)+"K"
    }
    else{
        return value;
    }
}