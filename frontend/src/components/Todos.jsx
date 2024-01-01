import PropTypes from 'prop-types';

export function Todos({todos}){
    return (
        <div>
        {todos.map(function(todo) {
            return(
                // eslint-disable-next-line react/jsx-key
                <div>
                    <h1>{todo.title}</h1>
                    <h2>{todo.description}</h2>
                    <button onClick={() => {
                      fetch("http://localhost:3000/completed" , {
                        method : "PUT",
                        body: JSON.stringify({
                            id : todo._id,
                            completed : true
                        }),
                        headers: {
                            "Content-type" : "application/json"
                        }
                    })
                    .then(async (res) => {
                        const json = await res.json();
                        alert("Todo updated");
                    })
                    }}>{todo.completed == true ? "Completed" : "Mark as Completed"}</button>
                </div>
            )
        })}
        </div>
    )
}

Todos.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };