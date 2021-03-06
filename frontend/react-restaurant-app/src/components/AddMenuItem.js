import { useState } from 'react';
import Cookies from 'js-cookie';

const handleError = err => {
	console.warn(err);
}

const AddMenuItem = ({updatePage, addItemToMenu}) => {
    
    const start = {
        title: '',
        description: '',
        price: '',
        imgSrc: '', 
        active: true,
    }
    
    const [state, setState] = useState(start);
    const [preview, setPreview] = useState(null)

    const handleImage = (e) => {
        const file = e.target.files[0];
        setState({...state, imgSrc: file});

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        }

        reader.readAsDataURL(file);
    }

    const saveNewMenuItem = async (newMenuItem) => {
		const formData = new FormData();
        Object.entries(newMenuItem).forEach(entry => formData.append(entry[0], entry[1]));
        
        const options = {
			method: 'POST',
			headers: {
				'X-CSRFToken': Cookies.get('csrftoken'),
			},
			body: formData,
		}

		const response = await fetch('/api_v1/foods/admin/', options).catch(handleError);

		if(!response.ok) {
			throw new Error('Network response was not ok!');
		}

        addItemToMenu(newMenuItem);
	}
    

    const handleSubmit = (e) => {
        e.preventDefault();
        saveNewMenuItem(state);
        updatePage('menu-items');
        setState(start);
    }

    return (
        
        <section className="add-menu-item-section">
            <h2>Add Menu Item</h2>
            <form className="add-menu-item-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" required onChange={(e) => setState({...state, title: e.target.value})}/>
                </div>
                <div className="form-row">
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" required onChange={(e) => setState({...state, description: e.target.value})}/>
                </div>
                <div className="form-row">
                    <label htmlFor="price">Price ($)</label>
                    <input type="text" id="price" required onChange={(e) => setState({...state, price: parseFloat(e.target.value).toFixed(2)})}/>
                </div>
                <div className="form-row">
                    <label htmlFor="image">Image</label>
                    <input type="file" id="image" required onChange={handleImage}/>
                    {state.imgSrc && <img className="image-preview" src={preview} alt='article' />}
                </div>
                <div className="active">
                    <label htmlFor="active" id="active-label">Active</label>
                    <input type="checkbox" id="active" defaultChecked={state.active} onChange={(e) => setState({...state, active: e.target.checked})}/>
                </div>
                <div className="add-bottom">
                    <button type="button" className="btn btn-secondary cancel-new-menu-item" onClick={() => updatePage('menu-items')}>Cancel</button>
                    <button type="submit" className="btn btn-success finish-add-menu-item">Add</button> 
                </div>
            </form>
        </section>
    )
}

export default AddMenuItem;