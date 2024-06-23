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
        stage('Build Project') {
            tools {
                nodejs "node"
            }
            steps {
                sh 'yarn build'
            }
        }
        stage('Update Deployment') {
            steps {
                step ("Clean directory"){ 
                    sh 'sudo rm * -r /srv/data/www/fenext/api'
                }
                step ("Copy Files"){ 
                    sh 'cp -r * /srv/data/www/fenext/api'
                }
            }
        }
  }
}