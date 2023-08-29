import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTweets, clearTweetErrors } from '../../store/tweets';
import TweetBox from '../Tweets/TweetBox';
import './Profile.css';

function Profile () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userTweets = useSelector(state => Object.values(state.tweets.user))
  
  useEffect(() => {
    dispatch(fetchUserTweets(currentUser._id));
    return () => dispatch(clearTweetErrors());
  }, [currentUser, dispatch]);

  if (userTweets.length === 0) {
    return <div>{currentUser.username} has no Streams</div>;
  } else {
    return (
      <div className="profile">
      <h2 className="profile-heading">All of {currentUser.username}'s Streams</h2>
      <div className="tweets-container">
        {userTweets.map((tweet) => (
          <TweetBox key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}
}

export default Profile;