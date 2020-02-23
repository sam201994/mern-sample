/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import MentorsPage from 'containers/Mentors';
import MentorAdmin from 'containers/Mentors/MentorAdmin';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={MentorsPage} />
        <Route path="/mentor_admin/:id?" component={MentorAdmin} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
