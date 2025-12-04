import Editor from '../componet/Editor';

const Home = () => {   
    return (
        <div>
            <Editor onSubmit = 
            { (state)=> alert(state.content)} />
        </div>
    );
};

export default Home;