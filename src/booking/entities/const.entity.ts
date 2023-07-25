import { registerEnumType } from '@nestjs/graphql';

export enum CounselorType {
    PSYHOPE = "PSYHOPE",
    FACULTY = "FACULTY"
  }
  
  export enum Topic {
    TOPIC_1 = "TOPIC_1",
    TOPIC_2 = "TOPIC_2",
    TOPIC_3 = "TOPIC_3"
  }

  export enum StatusRequest {
    ACCEPTED = "ACCEPTED",
    NEED_ACCEPTED = "NEED_ACCEPTED"
  }
  

  registerEnumType(CounselorType, {
    name: 'CounselorType',
    description: 'The type of counselor, either PSYHOPE or FACULTY',
  })

  registerEnumType(StatusRequest, {
    name: 'StatusRequest'
  })
  
  registerEnumType(Topic, {
    name: 'bookingTopic'
  })