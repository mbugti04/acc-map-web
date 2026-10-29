import "leaflet/dist/leaflet.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MapComponent from './MapComponent';
import ForumComponent from './ForumComponent';
import { Container, Navbar, Nav } from 'react-bootstrap';

function About() {
  return (
    <div style={{ padding: '20px', width: '70%', margin: '0 auto', textAlign: 'center' }}>
      <div>
        <h1>Important Links</h1>
      </div>

      <div>
        <ul>
          <li><a href="https://github.com/mbugti04/acc-map-web">Our Github Link</a></li>
          <li><a href="https://devpost.com/software/accmap">Our Devpost Link</a></li>
        </ul>
      </div>

      <div>
        <h1>About the Project</h1>
      </div>

      <div style={{ justifyContent: 'left', textAlign: 'left'  }}>
        AccMap is a First Place Winner for Wesleyan University's Annual Hackathon, WesHack 2024! 

        <h2 style={{textAlign: 'center'  }}>Inspiration</h2>

        Without the endless efforts of student leaders at our college campus who organize and advocate for accessibility resources, we would not know much about what accessibility looks like in our day-to-day lives and the importance of advocating for accessibility. 

        <h2 style={{textAlign: 'center'  }}>What AccMap does</h2>

        When a user opens the application, they will see a map showing the user's location and a feed that will showcase anonymous submissions of what people report. 

        <h3 style={{textAlign: 'center'  }}>Map Tab:</h3>
        The map tab shows the locations of the posts made to easily find obstacles or inaccessible
        areas to make the trip easier. This would also allow the user to see the area immediately around
        them so that they can see what issues are most present around them and bring awareness to
        these issues so that they can be fixed for those who need it. It would also allow others to verify
        the posts made by being able to go and see if the post is true or if the problem has been fixed
        and being able to comment so others can be made aware of the repair.

        <h3 style={{textAlign: 'center'  }}>Feed Tab:</h3>
        The feed tab will show the posts made closest to them so that the user can see the closest
        obstacle or inaccessible post on their trip. This would also allow the user to be able to see
        upcoming barriers and not accidentally find them. It would also allow other users to post
        questions to the community to allow them to see if a location is available to them before having
        to make the trip.

        <h2 style={{textAlign: 'center'  }}>How we built it</h2>

        We used a web stack of HTML, CSS, JS, Flask, Bootstrap, LeafletJs and ReactJs to build our website. HTML, CSS, JS are the bases for our website’s structure. Flask is where we host our data. Bootstrap and React provided us with pre-styled and seamless components. We used LeaftletJs to integrate an interactive map for users to use. And we all managed our code with Git and our project management on Trello.

        <h2 style={{textAlign: 'center'  }}>Challenges we ran into</h2>

        All of us have different levels of proficiency when it comes to using various technologies and frameworks. We wanted AccMap to be a WebApp that runs on React Native, but we had trouble working with it across all devices. Some of the team had also faced the issue of not being able to run the required program. Another issue we had faced is having to iterate by changing the program used to run the application, from React Native to React which required us to fix bugs that occurred during the change. This impacted our goals of making a progressive WebApp to a WebApp, limitig the scope of the application.

        <h2 style={{textAlign: 'center'  }}>What We Learned and Accomplishments</h2>

        - Experimenting and implementing external APIs like LeafletJs and BootStrap. 
        - Working together utilizing our strengths in a full hackathon project; we also learned we can stay up for a good while #mentalhealthisimportant
        - Having a working map that is integrated with a working feed for users to post, where they can be both updated when a submission is added. 

        <h2 style={{textAlign: 'center'  }}>What's next for AccMap</h2>
        AccMap is NOT a permanent solution to making our world accessible. Accmap is an educational tool that addresses the needs of users who want to make their lives easier. Our institutions should always keep accessibility in mind, and not as an afterthought. Our team wants this app to address how inaccessibility affects everyone, whether we realize it or not, and give users the platform to learn more about accessibility and voice their concerns. We are working to incorporate more user interaction and to make sure that the application is web-accessible.

      </div>


      <div>
        <h1>The Developer Team</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        <div>
          <h2>Mustafa Bugti</h2>
          <img src="/images/mustafa.png" alt="Mustafa Bugti" width="400" height="400" style={{ objectFit: 'cover' }} />
        </div>
        <div>
          <h2>Jangael Rosales</h2>
          <img src="/images/jangael.jpg" alt="Jangael Rosales" width="400" height="400" style={{ objectFit: 'cover' }} />
        </div>
        <div>
          <h2>Jun Yi He Wu</h2>
          <img src="/images/jun.jpg" alt="Jun Yi He Wu" width="400" height="400" style={{ objectFit: 'cover' }} />
        </div>
        <div>
          <h2>Ricardo Flores</h2>
          <img src="/images/ricardo.png" alt="Ricardo Flores" width="400" height="400" style={{ objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
}

export default About
