
import Settings from '../conteiners/Settings'
import Sums from '../conteiners/Sums'
import Home from '../conteiners/Home'
import Final from '../conteiners/Final'


let routes =[
    {
        name:'Home',
        url:'/',
        component: Home,
        exact:true,
        nav:true
    },
    {
        name:'Settings',
        url:'/settings',
        component: Settings,
        exact:true,
        nav:true
    },
    {
        name:'Sums',
        url:'/sums',
        component: Sums,
        exact:true,
        nav:true
    },
    {
        name:'Final',
        url:'/final',
        component: Final,
        exact:true,
        nav:true
    }
];

let routesMap = {};

routes.forEach((route)=>{
    if(route.hasOwnProperty('name')){
        routesMap[route.name] = route.url;
    }
});

let urlBuilder = function (name,params) {
    if(!routesMap.hasOwnProperty(name)){
        return null
    }

    let url = routesMap[name];
    for (let key in params){
        url = url.replace(':'+key,params[key])
    }

    return url

};

export default routes
export {routesMap,urlBuilder};