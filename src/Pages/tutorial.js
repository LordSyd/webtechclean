import React,{useState, useEffect} from 'react';
import ReactDOM from 'react-dom';


/*class Tutorial extends React.Component {
    constructor(props){
        super(props);
        this.test = this.test.bind(this);
    }



    render() {
        return(
            <div>
                <div>sdsdfsdfsd</div>
                <div className="ssadfadfasd" onClick={}>sdsdfsdfsd</div>

            </div>
        )
    }
}*/


export default function Tutorial2() {

    const [name, setName] = useState();

    useEffect(() => {
        //to something
    },["dependency"]) // [] => nur nach render ; leer => nach jedem update; [dependency] => nur wenn dependency sich ändert

    function test(){
        setName("1");
        name;}

    return (<div>
        <div>sdsdfsdfsd</div>
        <div className="ssadfadfasd" onClick={test}>sdsdfsdfsd</div>

    </div>);
}

 const Tutorial3 = () => {


    return (<div>
        <div>sdsdfsdfsd</div>
        <div className="ssadfadfasd" onClick={}>sdsdfsdfsd</div>

    </div>);
}

export default Tutorial3;

ReactDOM.render(<Tutorial2 />, document.getElementById('root'));
