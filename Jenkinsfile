pipeline {
agent {
    docker {
        image 'maven:3.8.1-adoptopenjdk-11'
        args  '-v /tmp:/tmp'
    }
}
    stages {
        stage ('clone repository') {
            steps {
                dir('backend') {
                 sh "pwd"
                 sh 'mvn -Dmaven.test.failure.ignore=true install'
                 }
            }
        }

        stage ('Build') {
            steps {
                 dir('frontend') {
                 sh "pwd"
                 sh 'npm install'
                 }  
            }
            post {
                success {
                    junit 'target/surefire-reports/**/*.xml' 
                }
            }
        }
    }
}
