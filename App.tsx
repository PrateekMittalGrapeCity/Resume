import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './components/MyStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): JSX.Element {
  async function putData() {
    try {
      const jsonValue = JSON.stringify({
        name: 'Prateek Mittal',
        role: 'Trainee',
        location: 'Delhi, India',
        introduction:
          'A tech Enthusiast. Over 6+ months of experience in Web Development, App Development, Automation Tools.',
        skills: [
          {
            skill: 'React',
            source:
              'data:image/png;base64,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',
          },
          {
            skill: 'React-Native',
            source:
              'https://www.datocms-assets.com/45470/1631026680-logo-react-native.png',
          },
          {
            skill: 'Javascript',
            source:
              'https://1000logos.net/wp-content/uploads/2020/09/JavaScript-Logo.png',
          },
          {
            skill: 'HTML',
            source:
              'data:image/png;base64,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',
          },
          {
            skill: 'CSS',
            source:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png',
          },
          {
            skill: 'C',
            source:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/C_Programming_Language.svg/1200px-C_Programming_Language.svg.png',
          },
          {
            skill: 'C++',
            source:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png',
          },
          {
            skill: 'Python',
            source:
              'data:image/jpeg;base64,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',
          },
          {
            skill: 'Java',
            source:
              'data:image/png;base64,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',
          },
          {
            skill: 'MsSQL',
            source:
              'https://raw.githubusercontent.com/github/explore/96943574ba0c0340ba6ea1e6f768e9abe43e34e1/topics/sql-server/sql-server.png',
          },
          {
            skill: 'Cypress',
            source:
              'https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_10f53e90961b98df0191922f13efd135/cypress.png',
          },
          {
            skill: 'JMeter',
            source:
              'data:image/png;base64,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',
          },
          {
            skill: 'Postman',
            source:
              'https://yt3.googleusercontent.com/X-rhKMndFm9hT9wIaJns1StBfGbFdLTkAROwm4UZ3n9ucrBky5CFIeeZhSszFXBgQjItzCD0SA=s900-c-k-c0x00ffffff-no-rj',
          },
        ],
        educations: [
          {
            standard: 'X',
            year: '2016 - 2017',
            marks: '9.2 CGPA',
          },
          {
            standard: 'XII',
            year: '2018 - 2019',
            marks: '89%',
          },
          {
            standard: 'B.tech (Information Technology)',
            year: '2019 - 2023',
            marks: '9.032 CGPA',
          },
        ],
        experiences: [
          {
            role: 'Python Developer',
            companyName: 'Exceedance',
            timePeriod: 'Aug 2021 - Oct 2021',
          },
          {
            role: 'BackEnd Developer',
            companyName: 'InnitfortheTech',
            timePeriod: 'Jun 2022 - Aug 2022',
          },
          {
            role: 'Trainee',
            companyName: 'GrapeCity India Private Limited',
            timePeriod: 'Feb 2023 - Sep 2023',
          },
        ],
        achievements: [
          {
            title: 'ATL Boy',
            year: '2019',
          },
          {
            title: 'RoboCup National Winner',
            year: '2018',
          },
          {
            title: 'RoboCup Zonal 2nd Runner-Up',
            year: '2018',
          },
        ],
      });
      await AsyncStorage.setItem('@User', jsonValue);
    } catch (e) {
      console.log('Saving some error');
    }
  }

  useEffect(() => {
    putData();
  }, []);

  return (
    // <View style={{height: '100%', width: '100%'}}>
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
    // </View>
  );
}

export default App;