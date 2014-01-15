var facetedResultsSearch = {

	"query": "foo",

	"counts": {
		total: 318,
		facets: [
			{name: "Projects", type: "project", count:2},
			{name: "Jobs", type: "job", count:0},
			{name: "Job Runs", type: "jobRuns", count:0},
			{name: "Workflows", type: "workflow", count:29},
			{name: "Workflow Runs", type: "workflowRun", count:103},
			{name: "Shared Files", type: "sharedFile", count:5},
			{name: "Project Files", type: "projectFile", count:169}
		],
		tags: [
			{name: "foo", count:9, color: 13},
			{name: "bar", count:2, color: 7},
			{name: "baz", count:3, color: 2}
		]
	},

	"items": {
		"facets": {
			"project": [
				{"idAWBProject": "233", "idClient": "5066", "name": "Core Modeling", "description": "", "UpdatedBy": "demo@clarioanalytics.com", "UpdatedTS": "Wed, 03 Oct 2012 21:13:17 GMT", "contentLength": "149", "type": "project", "parentType": "client", "id": "233", "parentId": "5066", "path": [], "tags": [
					["bar", 2, 97299],
					["foo", 0, 101574],
					["proj", 3, 3449693]
				], "version": "2", "constants": [
					{"name": "Today", "type": "D", "value": "2011-08-04T00:00:00"},
					{"name": "population", "type": "S", "value": "UNIV"}
				]},
				{"idAWBProject": "1627", "idClient": "5066", "name": "Core Campaign Reporting", "description": "", "UpdatedBy": "demo@clarioanalytics.com", "UpdatedTS": "Tue, 21 Aug 2012 13:22:51 GMT", "contentLength": "141", "type": "project", "parentType": "client", "id": "1627", "parentId": "5066", "path": [], "tags": [
					["bar", 2, 97299],
					["foo", 0, 101574],
					["proj", 3, 3449693]
				], "version": "2", "constants": [
					{"name": "start_date", "type": "D", "value": "2011-07-01T00:00:00"}
				]}
			],
			"workflow": [
				{"idWorkFlow": "1240", "idAWBProject": "142", "Configuration": "NULL", "CreatedBy": "demo@clarioanalytics.com", "CreatedTS": "2009-04-16 20:52:48", "UpdatedBy": "demo@clarioanalytics.com", "UpdatedTS": "2012-10-22 20:47:03", "name": "Explore Census", "hasRuns": "1", "type": "workflow", "parentType": "project", "id": "1240", "parentId": "142", "tags": [
					["bar", 2, 97299],
					["foo", 0, 101574]
				], "readFiles": ["readFile_1"], "writeFiles": []},
				{"idWorkFlow": "14386", "idAWBProject": "142", "Configuration": "NULL", "CreatedBy": "antje.monaghan@dii-online.com", "CreatedTS": "2012-03-27 19:11:20", "UpdatedBy": "demo@clarioanalytics.com", "UpdatedTS": "2012-10-23 21:54:34", "name": "Prepare Demo Data", "hasRuns": "1", "type": "workflow", "parentType": "project", "id": "14386", "parentId": "142", "tags": [
					["bar", 2, 97299],
					["foo", 0, 101574]
				], "readFiles": ["readfile703A9665339172AFF29C559177C4B1B9"], "writeFiles": ["DEMO_MISC.CSV"]},
				{"idWorkFlow": "14667", "idAWBProject": "142", "Configuration": "NULL", "CreatedBy": "demo@clarioanalytics.com", "CreatedTS": "2012-04-20 14:25:30", "UpdatedBy": "demo@clarioanalytics.com", "UpdatedTS": "2012-10-23 22:12:53", "name": "Explore Correlations", "hasRuns": "1", "type": "workflow", "parentType": "project", "id": "14667", "parentId": "142", "tags": [
					["bar", 2, 97299],
					["foo", 0, 101574]
				], "readFiles": ["readfile241FB183DEC98A454233D02DB3475166"], "writeFiles": []},
				{"idWorkFlow": "14923", "idAWBProject": "142", "Configuration": "NULL", "CreatedBy": "antje.monaghan@dii-online.com", "CreatedTS": "2012-05-11 16:48:23", "UpdatedBy": "antje.monaghan@dii-online.com", "UpdatedTS": "2012-10-23 21:54:20", "name": "Random", "hasRuns": "1", "type": "workflow", "parentType": "project", "id": "14923", "parentId": "142", "tags": [
					["bar", 2, 97299],
					["foo", 0, 101574]
				], "readFiles": ["readfileB5611577DDEDC8EC24CD3CCCB5E13D32"], "writeFiles": []},
				{"idWorkFlow": "10079", "idAWBProject": "1620", "Configuration": "NULL", "CreatedBy": "demo@clarioanalytics.com", "CreatedTS": "2011-07-08 14:49:12", "UpdatedBy": "antje.monaghan@dii-online.com", "UpdatedTS": "2012-11-27 03:04:59", "name": "1. Select", "hasRuns": "1", "type": "workflow", "parentType": "project", "id": "10079", "parentId": "1620", "tags": [
					["bar", 2, 97299],
					["foo", 0, 101574]
				], "readFiles": ["readfileFC8AA7604270A4D9694AAEDB8B0BC228"], "writeFiles": ["SELECTION_SAMPLE.CSV"]}
			]
		},


		"tags": {
			"bar": [
				{"idAWBProject": "233", "idClient": "5066", "name": "Core Modeling", "description": "", "UpdatedBy": "demo@clarioanalytics.com", "UpdatedTS": "Wed, 03 Oct 2012 21:13:17 GMT", "contentLength": "149", "type": "project", "parentType": "client", "id": "233", "parentId": "5066", "path": [], "tags": [
					["bar", 2, 97299],
					["foo", 0, 101574],
					["proj", 3, 3449693]
				], "version": "2", "constants": [
					{"name": "Today", "type": "D", "value": "2011-08-04T00:00:00"},
					{"name": "population", "type": "S", "value": "UNIV"}
				]},
				{"idAWBProject": "1627", "idClient": "5066", "name": "Core Campaign Reporting", "description": "", "UpdatedBy": "demo@clarioanalytics.com", "UpdatedTS": "Tue, 21 Aug 2012 13:22:51 GMT", "contentLength": "141", "type": "project", "parentType": "client", "id": "1627", "parentId": "5066", "path": [], "tags": [
					["bar", 2, 97299],
					["foo", 0, 101574],
					["proj", 3, 3449693]
				], "version": "2", "constants": [
					{"name": "start_date", "type": "D", "value": "2011-07-01T00:00:00"}
				]},
				{"idWorkFlow": "1240", "idAWBProject": "142", "Configuration": "NULL", "CreatedBy": "demo@clarioanalytics.com", "CreatedTS": "2009-04-16 20:52:48", "UpdatedBy": "demo@clarioanalytics.com", "UpdatedTS": "2012-10-22 20:47:03", "name": "Explore Census", "hasRuns": "1", "type": "workflow", "parentType": "project", "id": "1240", "parentId": "142", "tags": [
					["bar", 2, 97299],
					["foo", 0, 101574]
				], "readFiles": ["readFile_1"], "writeFiles": []},
				{"idWorkFlow": "14386", "idAWBProject": "142", "Configuration": "NULL", "CreatedBy": "antje.monaghan@dii-online.com", "CreatedTS": "2012-03-27 19:11:20", "UpdatedBy": "demo@clarioanalytics.com", "UpdatedTS": "2012-10-23 21:54:34", "name": "Prepare Demo Data", "hasRuns": "1", "type": "workflow", "parentType": "project", "id": "14386", "parentId": "142", "tags": [
					["bar", 2, 97299],
					["foo", 0, 101574]
				], "readFiles": ["readfile703A9665339172AFF29C559177C4B1B9"], "writeFiles": ["DEMO_MISC.CSV"]},
				{"idWorkFlow": "14667", "idAWBProject": "142", "Configuration": "NULL", "CreatedBy": "demo@clarioanalytics.com", "CreatedTS": "2012-04-20 14:25:30", "UpdatedBy": "demo@clarioanalytics.com", "UpdatedTS": "2012-10-23 22:12:53", "name": "Explore Correlations", "hasRuns": "1", "type": "workflow", "parentType": "project", "id": "14667", "parentId": "142", "tags": [
					["bar", 2, 97299],
					["foo", 0, 101574]
				], "readFiles": ["readfile241FB183DEC98A454233D02DB3475166"], "writeFiles": []},
				{"idWorkFlow": "14923", "idAWBProject": "142", "Configuration": "NULL", "CreatedBy": "antje.monaghan@dii-online.com", "CreatedTS": "2012-05-11 16:48:23", "UpdatedBy": "antje.monaghan@dii-online.com", "UpdatedTS": "2012-10-23 21:54:20", "name": "Random", "hasRuns": "1", "type": "workflow", "parentType": "project", "id": "14923", "parentId": "142", "tags": [
					["bar", 2, 97299],
					["foo", 0, 101574]
				], "readFiles": ["readfileB5611577DDEDC8EC24CD3CCCB5E13D32"], "writeFiles": []},
				{"idWorkFlow": "10079", "idAWBProject": "1620", "Configuration": "NULL", "CreatedBy": "demo@clarioanalytics.com", "CreatedTS": "2011-07-08 14:49:12", "UpdatedBy": "antje.monaghan@dii-online.com", "UpdatedTS": "2012-11-27 03:04:59", "name": "1. Select", "hasRuns": "1", "type": "workflow", "parentType": "project", "id": "10079", "parentId": "1620", "tags": [
					["bar", 2, 97299],
					["foo", 0, 101574]
				], "readFiles": ["readfileFC8AA7604270A4D9694AAEDB8B0BC228"], "writeFiles": ["SELECTION_SAMPLE.CSV"]}
			],
			"foo": [
				{"idAWBProject": "233", "idClient": "5066", "name": "Core Modeling", "description": "", "UpdatedBy": "demo@clarioanalytics.com", "UpdatedTS": "Wed, 03 Oct 2012 21:13:17 GMT", "contentLength": "149", "type": "project", "parentType": "client", "id": "233", "parentId": "5066", "path": [], "tags": [
					["bar", 2, 97299],
					["foo", 0, 101574],
					["proj", 3, 3449693]
				], "version": "2", "constants": [
					{"name": "Today", "type": "D", "value": "2011-08-04T00:00:00"},
					{"name": "population", "type": "S", "value": "UNIV"}
				]},
				{"idAWBProject": "1627", "idClient": "5066", "name": "Core Campaign Reporting", "description": "", "UpdatedBy": "demo@clarioanalytics.com", "UpdatedTS": "Tue, 21 Aug 2012 13:22:51 GMT", "contentLength": "141", "type": "project", "parentType": "client", "id": "1627", "parentId": "5066", "path": [], "tags": [
					["bar", 2, 97299],
					["foo", 0, 101574],
					["proj", 3, 3449693]
				], "version": "2", "constants": [
					{"name": "start_date", "type": "D", "value": "2011-07-01T00:00:00"}
				]},
				{"idWorkFlow": "1240", "idAWBProject": "142", "Configuration": "NULL", "CreatedBy": "demo@clarioanalytics.com", "CreatedTS": "2009-04-16 20:52:48", "UpdatedBy": "demo@clarioanalytics.com", "UpdatedTS": "2012-10-22 20:47:03", "name": "Explore Census", "hasRuns": "1", "type": "workflow", "parentType": "project", "id": "1240", "parentId": "142", "tags": [
					["bar", 2, 97299],
					["foo", 0, 101574]
				], "readFiles": ["readFile_1"], "writeFiles": []},
				{"idWorkFlow": "14386", "idAWBProject": "142", "Configuration": "NULL", "CreatedBy": "antje.monaghan@dii-online.com", "CreatedTS": "2012-03-27 19:11:20", "UpdatedBy": "demo@clarioanalytics.com", "UpdatedTS": "2012-10-23 21:54:34", "name": "Prepare Demo Data", "hasRuns": "1", "type": "workflow", "parentType": "project", "id": "14386", "parentId": "142", "tags": [
					["bar", 2, 97299],
					["foo", 0, 101574]
				], "readFiles": ["readfile703A9665339172AFF29C559177C4B1B9"], "writeFiles": ["DEMO_MISC.CSV"]},
				{"idWorkFlow": "14667", "idAWBProject": "142", "Configuration": "NULL", "CreatedBy": "demo@clarioanalytics.com", "CreatedTS": "2012-04-20 14:25:30", "UpdatedBy": "demo@clarioanalytics.com", "UpdatedTS": "2012-10-23 22:12:53", "name": "Explore Correlations", "hasRuns": "1", "type": "workflow", "parentType": "project", "id": "14667", "parentId": "142", "tags": [
					["bar", 2, 97299],
					["foo", 0, 101574]
				], "readFiles": ["readfile241FB183DEC98A454233D02DB3475166"], "writeFiles": []},
				{"idWorkFlow": "14923", "idAWBProject": "142", "Configuration": "NULL", "CreatedBy": "antje.monaghan@dii-online.com", "CreatedTS": "2012-05-11 16:48:23", "UpdatedBy": "antje.monaghan@dii-online.com", "UpdatedTS": "2012-10-23 21:54:20", "name": "Random", "hasRuns": "1", "type": "workflow", "parentType": "project", "id": "14923", "parentId": "142", "tags": [
					["bar", 2, 97299],
					["foo", 0, 101574]
				], "readFiles": ["readfileB5611577DDEDC8EC24CD3CCCB5E13D32"], "writeFiles": []},
				{"idWorkFlow": "10079", "idAWBProject": "1620", "Configuration": "NULL", "CreatedBy": "demo@clarioanalytics.com", "CreatedTS": "2011-07-08 14:49:12", "UpdatedBy": "antje.monaghan@dii-online.com", "UpdatedTS": "2012-11-27 03:04:59", "name": "1. Select", "hasRuns": "1", "type": "workflow", "parentType": "project", "id": "10079", "parentId": "1620", "tags": [
					["bar", 2, 97299],
					["foo", 0, 101574]
				], "readFiles": ["readfileFC8AA7604270A4D9694AAEDB8B0BC228"], "writeFiles": ["SELECTION_SAMPLE.CSV"]}
			],
			"proj": [
				{"idAWBProject": "233", "idClient": "5066", "name": "Core Modeling", "description": "", "UpdatedBy": "demo@clarioanalytics.com", "UpdatedTS": "Wed, 03 Oct 2012 21:13:17 GMT", "contentLength": "149", "type": "project", "parentType": "client", "id": "233", "parentId": "5066", "path": [], "tags": [
					["bar", 2, 97299],
					["foo", 0, 101574],
					["proj", 3, 3449693]
				], "version": "2", "constants": [
					{"name": "Today", "type": "D", "value": "2011-08-04T00:00:00"},
					{"name": "population", "type": "S", "value": "UNIV"}
				]},
				{"idAWBProject": "1627", "idClient": "5066", "name": "Core Campaign Reporting", "description": "", "UpdatedBy": "demo@clarioanalytics.com", "UpdatedTS": "Tue, 21 Aug 2012 13:22:51 GMT", "contentLength": "141", "type": "project", "parentType": "client", "id": "1627", "parentId": "5066", "path": [], "tags": [
					["bar", 2, 97299],
					["foo", 0, 101574],
					["proj", 3, 3449693]
				], "version": "2", "constants": [
					{"name": "start_date", "type": "D", "value": "2011-07-01T00:00:00"}
				]}
			]
		}
	}
};