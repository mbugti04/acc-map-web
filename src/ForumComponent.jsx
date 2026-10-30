import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { RADIUS_OPTIONS } from './constants';
import { formatDistance, formatRadius } from './geo';
import './ForumComponent.css'; // Add this import for custom styles

function ForumFilters({ count, radius, onRadiusChange, sort, onSortChange }) {
  return (
    <div className="forum-filters">
      <Form.Group className="forum-filter" controlId="feedRadius">
        <Form.Label>Within</Form.Label>
        <Form.Select size="sm" value={radius} onChange={e => onRadiusChange(Number(e.target.value))}>
          {RADIUS_OPTIONS.map(miles => (
            <option key={miles} value={miles}>{formatRadius(miles)}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="forum-filter" controlId="feedSort">
        <Form.Label>Sort by</Form.Label>
        <Form.Select size="sm" value={sort} onChange={e => onSortChange(e.target.value)}>
          <option value="nearest">Nearest</option>
          <option value="votes">Most votes</option>
        </Form.Select>
      </Form.Group>
      <span className="forum-count" aria-live="polite">
        {count} {count === 1 ? 'insight' : 'insights'}
      </span>
    </div>
  );
}

function ForumComponent({ posts, radius, onRadiusChange, sort, onSortChange, onUpdate }) {
  return (
    <>
      <ForumFilters
        count={posts.length}
        radius={radius}
        onRadiusChange={onRadiusChange}
        sort={sort}
        onSortChange={onSortChange}
      />
      {posts.length === 0 ? (
        <div className="forum-empty">
          <p className="fw-semibold mb-1">No nearby insights</p>
          <p className="text-muted small mb-0">
            Nothing reported within {formatRadius(radius)}. Move the map or widen the distance.
          </p>
        </div>
      ) : (
        <div className="forum-list">
          {posts.map(post => (
            <ForumPost key={post.id} location={post} onUpdate={onUpdate} />
          ))}
        </div>
      )}
    </>
  );
}

function ForumPost({ location, onUpdate }) {
  const handleVote = async (id, action) => {
    try {
      const response = await axios.post(`/api/locations/${id}/vote`, { action });
      onUpdate(response.data);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <Card>
      {location.image_path && <Card.Img variant="top" className="forum-image" src={location.image_path} alt="" />}
      <Card.Body>
        <Card.Subtitle className="forum-distance mb-2 text-muted">{formatDistance(location.distance)}</Card.Subtitle>
        <Card.Title>{location.marker_title || "No Title"}</Card.Title>
        <Card.Text>
          {location.marker_description || "No Description"}
        </Card.Text>
        <Card.Text>
          Votes: {location.vote_count}
        </Card.Text>

        <div className="action-container">
          <Button variant="primary" onClick={() => handleVote(location.id, 'increment')}>+1</Button>
          <Button variant="secondary" onClick={() => handleVote(location.id, 'decrement')}>-1</Button>
          <Accordion>
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
