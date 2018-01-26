import { ChatMessage } from './../data/ChatMessage';
import { Location } from './../data/Location';
import { Payment } from './../data/Payment';
import { Project } from './../data/Project';
import { Application } from './../data/Application';
import { Tag } from './../data/Tag';
import { User } from './../data/User';
import { Injectable } from '@angular/core';

@Injectable()
export class MapperService {

    constructor() {

    }

    public jsonToUser(json: any): User {
        if (!json) {
            return null;
        }
        return new User(json["username"],
            json["email"],
            json["password"],
            json["firstname"],
            json["lastname"],
            json["profilepicture"],
            this.jsonToTagArray(json["tags"]),
            json["id"],
            this.jsonToApplicationArray(json["applications"]),
            this.jsonToProjectArray(json["ownProjects"]),
            this.jsonToProjectArray(json["memberProjects"]),
            json["local"]
        );
    }

    public jsonToUserArray(json: any): User[] {
        let result: User[] = [];
        if (json && json.length > 0) {
            for (let user of json) {
                result.push(this.jsonToUser(user));
            }
        }

        return result;
    }

    public jsonToTagArray(json: any): Tag[] {
        let result: Tag[] = [];
        if (json && json.length > 0) {
            for (let tag of json) {
                result.push(this.jsonToTag(tag));
            }
        }

        return result;
    }

    jsonToTag(json: any): Tag {
        if (!json) {
            return null;
        }
        return new Tag(json["id"], json["title"]);
    }

    jsonToApplicationArray(json: any): Application[] {
        let result: Application[] = [];
        if (json && json.length > 0) {
            for (let application of json) {
                result.push(this.jsonToApplication(application));
            }
        }

        return result;
    }

    jsonToApplication(json: any): Application {
        if (!json) {
            return null;
        }

        if (!json["project"]) {
            return null;
        }

        return new Application(
            json["message"],
            json["project"]["id"],
            json["author"]["id"],
            json["status"],
            this.jsonToUser(json["author"]),
            json["id"],
            this.jsonToProject(json["project"]));
    }

    jsonToPayemnt(json: any): Payment {
        if (!json) {
            return null;
        }
        return new Payment(json["paid"], json["amount"]);
    }

    jsonToLocation(json: any): Location {
        if (!json) {
            return null;
        }
        return new Location(json["coordinates"], json["name"]);
    }

    jsonToProjectArray(json: any): Project[] {
        let result: Project[] = [];
        if (json && json.length > 0) {
            for (let project of json) {
                result.push(this.jsonToProject(project));
            }
        }

        return result;
    }

    jsonToProject(json: any): Project {
        if (!json) {
            return null;
        }
        return new Project(json["title"],
            json["description"],
            this.jsonToPayemnt(json["payment"]),
            this.jsonToTagArray(json["tags"]),
            json["maxMemberAmount"],
            json["startDate"],
            json["endDate"],
            (json["status"]) ? json["status"] : 0,
            this.jsonToUser(json["author"]),
            this.jsonToLocation(json["location"]),
            this.jsonToApplicationArray(json["applications"]),
            (json["id"]) ? json["id"] : json["_id"],
            this.jsonToUserArray(json["members"]),
            json["memberAmount"],
            json["local"])
    }

    jsonToChatMessage(json: any): ChatMessage {
        if (!json) {
            return null;
        }

        return new ChatMessage(json["message"], this.jsonToUser(json["author"]), new Date(json["sent"]));
    }

    jsonToChatMessageArray(json: any): ChatMessage[] {
        let result: ChatMessage[] = [];
        if (json && json.length > 0) {
            for (let message of json) {
                result.push(this.jsonToChatMessage(message));
            }
        }

        return result;
    }
}