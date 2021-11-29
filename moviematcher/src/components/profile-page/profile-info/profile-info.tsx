import React from 'react'

const ProfileInfo = () => {
    return (
        <div style={{display:'flex'}}>
            <div>
              <h1>Profile picture</h1>
            </div>
            <div>
              <p>Name</p>
              <p>Description</p>
              <button>Add/Delete</button>
              <button>Match</button>
            </div>
        </div>
    )
}

export default ProfileInfo
