pipeline {
    agent any
    stages {
        stage ('clone repository') {
            steps {
                sh '''cd backend'''
                sh '''ls'''
            }
        }

        stage ('Build') {
            steps {
                sh 'mvn -Dmaven.test.failure.ignore=true install' 
            }
            post {
                success {
                    junit 'target/surefire-reports/**/*.xml' 
                }
            }
        }
    }
}
