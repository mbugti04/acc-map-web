import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import { useState } from 'react';
import './ForumComponent.css'; // Add this import for custom styles

function ForumComponent({ locations }) {
  return (
    <div>
      {locations.map(location => (
        <ForumPost key={location.id} location={location} />
      ))}
    </div>
  );
}

function ForumPost({ location }) {
  const [voteCount, setVoteCount] = useState(location.vote_count);

  const handleVote = async (id, action) => {
    try {
      await axios.post(`/api/locations/${id}/vote`, { action });
      setVoteCount(prevCount => action === 'increment' ? prevCount + 1 : prevCount - 1);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <Card>
      <Card.Img variant="top" src={location.image_path || "holder.js/100px180"} />
      <Card.Body>
        <Card.Title>{location.marker_title || "No Title"}</Card.Title>
        <Card.Text>
          {location.marker_description || "No Description"}
        </Card.Text>
        <Card.Text>
          Votes: {voteCount}
        </Card.Text>
        
        <div className="action-container">
          <Button variant="primary" onClick={() => handleVote(location.id, 'increment')}>+1</Button>
          <Button variant="secondary" onClick={() => handleVote(location.id, 'decrement')}>-1</Button>
          <Accordion style={{ width: '100%' }}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Comments ({location.comments ? location.comments.length : 0})</Accordion.Header>
              <Accordion.Body>
                {location.comments && location.comments.length > 0 ? (
                  location.comments.map((comment, index) => (
                    <p key={index}>{comment}</p>
                  ))
                ) : (
                  <p>No comments yet.</p>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ForumComponent;