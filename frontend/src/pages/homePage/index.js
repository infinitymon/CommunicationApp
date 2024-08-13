import axios from "axios";
import { useEffect, useState } from "react";

const HomePage = () => {

    const [result, setResult] = useState(null);
    useEffect(()=>{
            axios.get('http://localhost:5000/calls', {
            params: {
            agent: "Agent 1"
            }
            })
            .then(res => setResult(res.data))
    },[])

    
    return(
        <div className="bg-danger w-100 h-25">
            <table>
                <thead>
                    <tr>
                        {/* {result} */}
                    </tr>
                </thead>
                <tr>

                </tr>
            </table>
        </div>
    )
}

export default HomePage;