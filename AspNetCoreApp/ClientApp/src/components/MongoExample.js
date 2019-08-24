import React, { Component } from 'react';

export class MongoExample extends Component {
    static displayName = 'Mongo Example';

    constructor(props) {
        super(props);
        this.state = { table: [], loading: true };

        fetch('api/MongoData/RetrieveTable')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ table: data, loading: false });
            });
        this.DeleteRow = this.DeleteRow.bind(this);
    }

    DeleteRow(obj)
    {
        console.log("hello");
        var p = obj.parentNode.parentNode;
        p.parentNode.removeChild(p);
    }

    static renderPeopleTable(table) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Sex</th>
                        <th>Location</th>
                        <th>Delete?</th>
                    </tr>
                </thead>
                <tbody>
                    {table.map(item =>
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>{item.sex}</td>
                            <td>{item.location}</td>
                            <td><input type="button" value="Delete Row" onClick={this.DeleteRow}/></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data);
        fetch('/api/MongoData/AddPerson', {
          method: 'POST',
          body: data,
        });
      }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : MongoExample.renderPeopleTable(this.state.table);

        return (
            <div>
                <h1>People Table</h1>
                <p>This component demonstrates adding to and retrieving from a MongoDB instance from a server.</p>
                {contents}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" />
                    </label>
                    <br/>
                    <label>
                        Age:
                        <input type="number" name="age" />
                    </label>
                    <br/>
                    <label>
                        Sex:
                        <select name="sex">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </label>
                    <br/>
                    <label>
                        Location:
                        <input type="text" name="location" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
