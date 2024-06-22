pipeline { 
  agent any
  stages {
        stage('Install Dependencies') {
            tools {
                nodejs "node"
            }
            steps {
                sh 'yarn install'
            }
        }
  }
}